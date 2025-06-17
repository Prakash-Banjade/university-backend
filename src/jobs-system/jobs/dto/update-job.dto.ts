import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateJobDto } from './create-job.dto';
import { EJobStatus } from '../entities/job.entity';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateJobDto extends PartialType(CreateJobDto) {
    @ApiPropertyOptional({ enum: EJobStatus, description: 'Status of the job' })
    @IsEnum(EJobStatus)
    @IsOptional()
    status: EJobStatus;
}
