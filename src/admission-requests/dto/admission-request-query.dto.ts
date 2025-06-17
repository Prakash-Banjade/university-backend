import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";

export class AdmissionRequestQueryDto extends QueryDto {
    @ApiPropertyOptional({ type: 'string', description: 'Course slug' })
    @IsString()
    @IsOptional()
    courseSlug?: string
}