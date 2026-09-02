import {
    BadRequestException,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Pool } from "pg";
import type { Profile } from "passport-google-oauth20";
import { PG_POOL } from "../database/database.constants";
import { LoginDto } from "./dto/login.dto";
import { SignupDto } from "./dto/signup.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class AuthService {
    constructor(
        @Inject(PG_POOL) private readonly pool: Pool,
        private readonly jwtService: JwtService,
    ) {}

    async signup(dto: SignupDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const insertQuery = `INSERT INTO users ("fullName", email, password) VALUES ($1, $2, $3) RETURNING *`;
        try {
            const result = await this.pool.query(insertQuery, [
                dto.fullName,
                dto.email,
                hashedPassword,
            ]);
            // Exclude the password from the response.
            const { password: _password, ...safeUser } = result.rows[0];
            return { message: "User registered successfully", user: safeUser };
        } catch (error: any) {
            if (error?.code === "23505") {
                throw new BadRequestException("Email already exists");
            }
            throw new InternalServerErrorException(
                "An error occurred while registering the user",
            );
        }
    }

    // Verifies credentials and returns a signed JWT (the controller sets it as a cookie).
    async login(dto: LoginDto): Promise<string> {
        const result = await this.pool.query(
            "SELECT user_id, password FROM users WHERE email = $1",
            [dto.email],
        );
        if (result.rows.length === 0) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid email or password");
        }

        return this.jwtService.signAsync({ userId: user.user_id });
    }

    // Validates a token issued by the OAuth callback so it can be re-set as a first-party cookie.
    async establishSession(token: string): Promise<string> {
        try {
            await this.jwtService.verifyAsync(token);
            return token;
        } catch {
            throw new UnauthorizedException("Invalid token");
        }
    }

    async getProfile(userId: number) {
        const result = await this.pool.query(
            `SELECT "fullName", email, current_position, target_position, linkedin FROM users WHERE user_id = $1`,
            [userId],
        );
        if (result.rows.length === 0) {
            throw new NotFoundException("User not found");
        }
        return result.rows[0];
    }

    async updateProfile(userId: number, dto: UpdateProfileDto) {
        const updateQuery = `
            UPDATE users
            SET "fullName" = $1, current_position = $2, target_position = $3, linkedin = $4
            WHERE user_id = $5
            RETURNING "fullName", email, current_position, target_position, linkedin`;
        const values = [
            dto.fullName.trim(),
            dto.currentPosition ?? null,
            dto.targetPosition ?? null,
            dto.linkedin ?? null,
            userId,
        ];
        const result = await this.pool.query(updateQuery, values);
        if (result.rows.length === 0) {
            throw new NotFoundException("User not found");
        }
        return result.rows[0];
    }

    // Signs a short-lived JWT for the OAuth callback redirect.
    signToken(userId: number): string {
        return this.jwtService.sign({ userId });
    }

    // Finds a user by google_id, links Google to an existing email account, or creates a new user.
    async validateGoogleUser(profile: Profile) {
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value;
        const fullName = profile.displayName;

        const byGoogleId = await this.pool.query(
            "SELECT * FROM users WHERE google_id = $1",
            [googleId],
        );
        if (byGoogleId.rows.length > 0) {
            return byGoogleId.rows[0];
        }

        const byEmail = await this.pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email],
        );
        if (byEmail.rows.length > 0) {
            const linked = await this.pool.query(
                `UPDATE users SET google_id = $1 WHERE email = $2 RETURNING *`,
                [googleId, email],
            );
            return linked.rows[0];
        }

        const newUser = await this.pool.query(
            `INSERT INTO users ("fullName", email, google_id) VALUES ($1, $2, $3) RETURNING *`,
            [fullName, email, googleId],
        );
        return newUser.rows[0];
    }
}
