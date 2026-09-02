import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProfileDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsOptional()
    @IsString()
    currentPosition?: string;

    @IsOptional()
    @IsString()
    targetPosition?: string;

    @IsOptional()
    @IsString()
    linkedin?: string;
}
