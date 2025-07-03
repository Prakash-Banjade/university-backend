import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Length, ValidateNested } from "class-validator";
import { EHeroLayoutTypes, THeroLayout } from "../entities/hero-section.entity";
import { EAlignment, EAlignmentExcludeCenter, ELinkVariant, Link } from "src/common/types/global.type";

export class LinkDto implements Link {
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

    @ApiProperty({ enum: ELinkVariant, example: ELinkVariant.Primary })
    @IsEnum(ELinkVariant)
    variant: ELinkVariant;

    @ApiProperty({ type: 'string' })
    @IsString()
    icon: string;
}

class BaseHeroLayoutDto {
    @ApiProperty({ enum: EHeroLayoutTypes })
    @IsEnum(EHeroLayoutTypes)
    type: EHeroLayoutTypes
}

class JumbotronHeroLayoutDto {
    @ApiProperty({ enum: [EHeroLayoutTypes.Jumbotron], default: EHeroLayoutTypes.Jumbotron })
    @IsEnum([EHeroLayoutTypes.Jumbotron])
    type: EHeroLayoutTypes = EHeroLayoutTypes.Jumbotron;

    @ApiPropertyOptional({ enum: EAlignment, description: 'Alignment of the jumbotron hero layout content' })
    @IsEnum(EAlignment)
    alignment: EAlignment;
}

class SplitHeroLayoutDto {
    @ApiProperty({ enum: [EHeroLayoutTypes.Split_Hero], default: EHeroLayoutTypes.Split_Hero })
    @IsEnum([EHeroLayoutTypes.Split_Hero])
    type: EHeroLayoutTypes = EHeroLayoutTypes.Split_Hero;

    @ApiPropertyOptional({ enum: EAlignmentExcludeCenter, description: 'Alignment of the split hero layout content' })
    @IsEnum(EAlignmentExcludeCenter)
    imagePosition: EAlignmentExcludeCenter;
}

export class HeroSectionDto {
    @ApiPropertyOptional({ type: 'string', format: 'uuid' })
    @IsUUID()
    @IsOptional()
    id?: string;

    @ApiPropertyOptional({ type: 'string' })
    @IsString()
    @Length(3, 50, { message: 'Headline must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    @IsOptional()
    headline?: string = "";

    @ApiPropertyOptional({ type: 'string' })
    @IsString()
    @Length(10, 200, { message: 'Subheadline must be between 10 and 200 characters' })
    @Transform(({ value }) => value?.trim())
    @IsOptional()
    subheadline?: string = "";

    @ApiPropertyOptional({ type: 'string' })
    @IsUUID()
    @IsOptional()
    imageId?: string | null = null;

    @ApiPropertyOptional({ type: LinkDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => LinkDto)
    @IsArray()
    @IsOptional()
    @ArrayMaxSize(2, { message: 'CTA must be less than 2' })
    cta?: LinkDto[] = [];

    @ApiProperty({ type: JumbotronHeroLayoutDto, description: 'Layout of the hero section' })
    @ValidateNested()
    @Type(() => BaseHeroLayoutDto, {
        keepDiscriminatorProperty: true,
        discriminator: {
            property: 'type',
            subTypes: [
                { value: JumbotronHeroLayoutDto, name: EHeroLayoutTypes.Jumbotron },
                { value: SplitHeroLayoutDto, name: EHeroLayoutTypes.Split_Hero },
            ],
        },
    })
    @IsDefined()
    layout: THeroLayout;
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