import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsString, Length } from "class-validator";
import { EJobType } from "../entities/job.entity";

export class CreateJobDto {
    @ApiProperty({ type: 'string', description: 'Title for the job' })
    @IsString()
    @Length(3, 50, { message: 'Title must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    title: string;

    @ApiProperty({ type: 'string', description: 'Department for the job' })
    @IsString()
    @Length(3, 50, { message: 'Department must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    department: string;

    @ApiProperty({ type: 'string', enum: EJobType, example: EJobType.FullTime })
    @IsEnum(EJobType)
    type: EJobType;

    @ApiProperty({ type: 'string', description: 'Description of the job' })
    @IsString()
    @Length(3, 10000, { message: 'Description must be between 3 and 10000 characters' })
    description: string;
}
