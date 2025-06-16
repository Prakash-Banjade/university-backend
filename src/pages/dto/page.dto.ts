import { ApiPropertyOptional } from "@nestjs/swagger";
import { HeroSectionDto } from "../hero-section/dto/hero-section.dto";
import { ArrayMaxSize, IsArray, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { MetadataDto } from "../metadata/dto/metadata.dto";

export class PageDto {
    @ApiPropertyOptional({ type: MetadataDto })
    @ValidateNested()
    @Type(() => MetadataDto)
    @IsOptional()
    metadata?: MetadataDto;
}