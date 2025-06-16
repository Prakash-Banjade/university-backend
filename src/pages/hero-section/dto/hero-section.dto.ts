import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Length, ValidateNested } from "class-validator";
import { CTA, ECtaVariant } from "src/pages/blocks";

export class CTADto implements CTA {
    @ApiProperty({ type: 'string', description: 'Button Link' })
    @IsString()
    @Length(1, 100, { message: 'Link must be between 1 and 100 characters' })
    @Transform(({ value }) => value?.trim())
    link: string;

    @ApiProperty({ type: 'string', description: 'Button Label' })
    @IsString()
    @Length(3, 15, { message: 'Text must be between 3 and 15 characters' })
    @Transform(({ value }) => value?.trim())
    text: string;

    @ApiProperty({ enum: ECtaVariant, example: ECtaVariant.Primary })
    @IsEnum(ECtaVariant)
    variant: ECtaVariant;

    @ApiProperty({ type: 'string' })
    @IsString()
    icon: string;
}

export class HeroSectionDto {
    @ApiPropertyOptional({ type: 'string', format: 'uuid' })
    @IsUUID()
    @IsOptional()
    id?: string;

    @ApiPropertyOptional({ type: 'string' })
    @IsString()
    @Length(3, 50, { message: 'Title must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    @IsOptional()
    title?: string = "";

    @ApiPropertyOptional({ type: 'string' })
    @IsString()
    @Length(10, 200, { message: 'Subtitle must be between 10 and 200 characters' })
    @Transform(({ value }) => value?.trim())
    @IsOptional()
    subtitle?: string = "";

    @ApiPropertyOptional({ type: 'string' })
    @IsUUID()
    @IsOptional()
    imageId?: string | null = null;

    @ApiPropertyOptional({ type: CTADto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CTADto)
    @IsArray()
    @IsOptional()
    @ArrayMaxSize(2, { message: 'CTA must be less than 2' })
    cta?: CTADto[] = [];
}

export class HeroSectionUpdateDto {
    @ApiProperty({ type: HeroSectionDto, isArray: true, description: 'Hero sections of the page' })
    @ValidateNested({ each: true })
    @Type(() => HeroSectionDto)
    @ArrayMaxSize(5, { message: 'Hero Sections must be less than 5' })
    @ArrayMinSize(1, { message: 'At least one hero section is required' })
    heroSections: HeroSectionDto[] = [];
}

export class HeroSectionUpdateQueryDto {
    @ApiProperty({ type: 'string', description: 'Page slug' })
    @IsString()
    @IsNotEmpty()
    page: string;
}