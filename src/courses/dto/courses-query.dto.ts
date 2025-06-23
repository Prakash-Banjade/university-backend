import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";
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

    @ApiPropertyOptional({ type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    asOptions: boolean = false;
}