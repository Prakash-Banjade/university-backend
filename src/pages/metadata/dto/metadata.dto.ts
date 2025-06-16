import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ArrayMaxSize, IsOptional, IsString, Length, ValidateNested } from "class-validator";

export class MetadataDto {
    @ApiPropertyOptional({ type: 'string' })
    @IsString()
    @Length(3, 50, { message: 'Title must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    @IsOptional()
    title?: string = "";

    @ApiPropertyOptional({ type: 'string' })
    @IsString()
    @Length(10, 300, { message: 'Description must be between 10 and 300 characters' })
    @Transform(({ value }) => value?.trim())
    @IsOptional()
    description?: string = "";

    @ApiPropertyOptional({ type: 'string', isArray: true })
    @IsString({ each: true })
    @ArrayMaxSize(10, { message: 'Keywords must be less than 10' })
    @Length(3, 50, { each: true, message: 'Keyword must be between 3 and 50 characters' })
    @IsOptional()
    keywords?: string[] = [];
}