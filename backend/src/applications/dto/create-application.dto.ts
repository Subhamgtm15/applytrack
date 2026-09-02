import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateApplicationDto {
    @IsString()
    @IsNotEmpty()
    company: string;

    @IsString()
    @IsNotEmpty()
    role: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    jobType: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsNotEmpty()
    dateApplied: string;

    @IsOptional()
    @IsString()
    salary?: string;

    @IsOptional()
    @IsString()
    source?: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsString()
    followUpDate?: string;

    @IsOptional()
    @IsString()
    interviewDate?: string;
}
