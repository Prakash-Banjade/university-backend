import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";
import { EJobStatus, EJobType } from "../entities/job.entity";

export class JobsQueryDto extends QueryDto {
    @ApiPropertyOptional({ type: 'string', description: 'Department of the job' })
    @IsString()
    @IsOptional()
    department?: string;

    @ApiPropertyOptional({ enum: EJobType, description: 'Type of the job' })
    @IsString()
    @IsOptional()
    type?: EJobType;

    @ApiPropertyOptional({ enum: EJobStatus, description: 'Status of the job' })
    @IsString()
    @IsOptional()
    status: EJobStatus;
}