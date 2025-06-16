import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";

export class CoursesQueryDto extends QueryDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    degree?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    faculty?: string;
}