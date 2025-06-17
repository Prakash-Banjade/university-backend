import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";

export class JobApplicationsQueryDto extends QueryDto {
    @ApiPropertyOptional({ type: 'string', description: 'Job ID' })
    @IsString()
    jobId?: string;
}