import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Pool } from "pg";
import { PG_POOL } from "../database/database.constants";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { UpdateApplicationDto } from "./dto/update-application.dto";

@Injectable()
export class ApplicationsService {
    constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

    async create(userId: number, dto: CreateApplicationDto) {
        // had_interview is a permanent milestone: true the moment an application is created in
        // (or reaches) the interview stage.
        const insertQuery = `INSERT INTO applications (company, role, location, job_type, salary, source, status, date_applied, follow_up_date, interview_date, notes, user_id, had_interview) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`;
        const values = [
            dto.company,
            dto.role,
            dto.location,
            dto.jobType,
            dto.salary,
            dto.source,
            dto.status,
            dto.dateApplied,
            dto.followUpDate || null,
            dto.interviewDate || null,
            dto.notes,
            userId,
            dto.status === "interview",
        ];
        const result = await this.pool.query(insertQuery, values);
        return result.rows[0];
    }

    async findAll(userId: number) {
        const result = await this.pool.query(
            `SELECT * FROM applications WHERE user_id = $1 ORDER BY date_applied DESC`,
            [userId],
        );
        return result.rows;
    }

    async findOne(userId: number, id: string) {
        const result = await this.pool.query(
            `SELECT * FROM applications WHERE id = $1 AND user_id = $2`,
            [id, userId],
        );
        if (result.rows.length === 0) {
            throw new NotFoundException("Application not found");
        }
        return result.rows[0];
    }

    async update(userId: number, id: string, dto: UpdateApplicationDto) {
        // had_interview references the existing row value (OR) so it is never cleared once set:
        // e.g. changing status from "interview" to "rejected" keeps the interview milestone true.
        // $13 is a dedicated boolean param so we don't reuse $7 in two conflicting type contexts.
        const updateQuery = `
            UPDATE applications
            SET company = $1, role = $2, location = $3, job_type = $4, salary = $5, source = $6, status = $7, date_applied = $8, follow_up_date = $9, notes = $10, interview_date = $14, had_interview = had_interview OR $13
            WHERE id = $11 AND user_id = $12
            RETURNING *`;
        const values = [
            dto.company,
            dto.role,
            dto.location,
            dto.jobType,
            dto.salary,
            dto.source,
            dto.status,
            dto.dateApplied,
            dto.followUpDate || null,
            dto.notes,
            id,
            userId,
            dto.status === "interview",
            dto.interviewDate || null,
        ];
        const result = await this.pool.query(updateQuery, values);
        if (result.rows.length === 0) {
            throw new NotFoundException("Application not found");
        }
        return result.rows[0];
    }

    async remove(userId: number, id: string) {
        const result = await this.pool.query(
            `DELETE FROM applications WHERE id = $1 AND user_id = $2 RETURNING *`,
            [id, userId],
        );
        return result.rows[0];
    }
}
