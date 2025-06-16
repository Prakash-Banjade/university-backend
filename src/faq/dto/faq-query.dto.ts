import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";

export class FaqQueryDto extends QueryDto {
    @ApiPropertyOptional({ type: String })
    @IsString()
    @IsOptional()
    category?: string;
}