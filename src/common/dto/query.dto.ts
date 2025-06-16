import { ApiPropertyOptional } from "@nestjs/swagger";
import { PageOptionsDto } from "./pageOptions.dto";
import { IsOptional, IsString } from "class-validator";

export enum Deleted {
    ONLY = "only",
    NONE = "none",
    ALL = "all",
}

export class QueryDto extends PageOptionsDto {
    @ApiPropertyOptional({ type: String, description: "Search query", default: "" })
    @IsOptional()
    search?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    skipPagination?: string = 'false';
}