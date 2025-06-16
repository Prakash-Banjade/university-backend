import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, IsUUID, Length, Min } from "class-validator";
import { EAcademicDegree, EAcademicFaculty } from "src/common/types/global.type";

export class CreateCourseDto {
    @ApiProperty({ type: "string", description: "Name of the course" })
    @IsString()
    @Length(3, 50, { message: "Name must be between 3 and 50 characters" })
    @Transform(({ value }) => value?.trim())
    name: string;

    @ApiProperty({ type: "string", description: "Summary of the course" })
    @IsString()
    @Length(3, 300, { message: "Summary must be between 3 and 300 characters" })
    @Transform(({ value }) => value?.trim())
    summary: string;

    @ApiProperty({ type: "string", description: "Description of the course" })
    @IsString()
    @Length(3, 10000, { message: "Description must be between 3 and 10000 characters" })
    description: string;

    @ApiProperty({ type: "number", description: "Duration of the course" })
    @IsString()
    @IsInt()
    @Min(1)
    duration: number; // in years

    @ApiProperty({ type: "string", enum: EAcademicDegree, description: "Degree of the course" })
    @IsEnum(EAcademicDegree)
    degree: EAcademicDegree;

    @ApiProperty({ type: "string", enum: EAcademicFaculty, description: "Faculty of the course" })
    @IsEnum(EAcademicFaculty)
    faculty: EAcademicFaculty;

    @ApiProperty({ type: "string", description: "Eligibility of the course" })
    @IsString()
    @Length(3, 300, { message: "Eligibility must be between 3 and 300 characters" })
    @Transform(({ value }) => value?.trim())
    eligibility: string;

    @ApiPropertyOptional({ type: "string", description: "Cover image id" })
    @IsUUID()
    @IsOptional()
    coverImageId?: string;
}
