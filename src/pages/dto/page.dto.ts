import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsOptional, IsString, Length, ValidateNested } from "class-validator";
import { PageSectionDto } from "./page-sections.dto";
import { Type } from "class-transformer";

export class CreatePageDto {
    @ApiProperty({ type: 'string', description: 'Name of the page' })
    @IsString()
    @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
    name: string;
}

export class UpdatePageDto extends PartialType(CreatePageDto) {
    @ApiProperty({ type: PageSectionDto, isArray: true })
    @Type(() => PageSectionDto)
    @ValidateNested({ each: true })
    @IsOptional()
    sections?: PageSectionDto[];
}