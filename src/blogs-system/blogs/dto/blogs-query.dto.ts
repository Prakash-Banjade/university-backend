import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";
import { getArrayQueryParam } from "src/common/utils";

export class BlogsQueryDto extends QueryDto {
    @ApiPropertyOptional()
    @IsString({ each: true })
    @IsOptional()
    @Transform(({ value }) => getArrayQueryParam(value))
    category?: string[] = [];
}