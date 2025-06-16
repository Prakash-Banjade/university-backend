import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsOptional } from "class-validator";

export enum PageSelectKeys {
    heroSections = 'heroSections',
    sections = 'sections',
    metadata = 'metadata',
}

export class PageQueryDto {
    @ApiPropertyOptional({ enum: PageSelectKeys, isArray: true })
    @IsEnum(PageSelectKeys, { each: true, message: `Invalid value provided to query "select"` })
    @Transform(({ value }) => {
        return Array.isArray(value) ? value : value?.split(',')
    })
    @IsOptional()
    select: PageSelectKeys[] = [];
}