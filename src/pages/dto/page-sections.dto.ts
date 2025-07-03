import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsInt, IsNumber, IsOptional, IsString, IsUrl, IsUUID, Length, MaxLength, Min, ValidateNested } from "class-validator";
import { Card, CardsBlock, EBlock, ECardsBlockLayout, FormBlock, ImageBlock, RefItemBlock, TextBlock } from "../blocks.interface";
import { EAlignment } from "src/common/types/global.type";
import { LinkDto } from "../hero-section/dto/hero-section.dto";

class BaseBlock {
    @ApiProperty({ enum: EBlock })
    @IsEnum(EBlock)
    type: EBlock
}

class TextBlockDto implements TextBlock {
    @ApiProperty({ enum: [EBlock.Text] })
    @IsEnum([EBlock.Text])
    type: EBlock.Text = EBlock.Text;

    @ApiProperty({ type: 'string' })
    @IsString()
    @Length(3, 50, { message: 'Headline must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    headline: string

    @ApiProperty({ type: 'string' })
    @IsString()
    @Length(3, 300, { message: 'Subheadline must be between 3 and 300 characters' })
    @Transform(({ value }) => value?.trim())
    @IsOptional()
    subheadline?: string = ""

    @ApiProperty({ type: 'string' })
    @IsString()
    @MaxLength(1000, { message: 'Body must be less than 1000 characters' })
    body: string

    @ApiProperty({ type: LinkDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => LinkDto)
    @IsArray()
    @ArrayMaxSize(2, { message: 'CTA must be less than 2' })
    @IsOptional()
    cta: LinkDto[] = [];

    @ApiProperty({ enum: EAlignment })
    @IsEnum(EAlignment)
    align: EAlignment
}

class ImageBlockDto implements ImageBlock {
    @ApiProperty({ enum: [EBlock.Image] })
    @IsEnum([EBlock.Image])
    type: EBlock.Image = EBlock.Image;

    @ApiProperty({ type: 'string', description: 'URL of the image' })
    @IsUrl()
    url: string

    @ApiProperty({ type: 'string', description: 'Alternative text for the image' })
    @IsString()
    @MaxLength(100, { message: 'Alt text must be less than 100 characters' })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    alt?: string

    @ApiProperty({ type: 'string', description: 'Caption for the image' })
    @IsString()
    @MaxLength(100, { message: 'Caption must be less than 100 characters' })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    caption?: string

    @ApiProperty({ type: 'string', description: 'Description of the image' })
    @IsString()
    @MaxLength(300, { message: 'Description must be less than 300 characters' })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    description?: string

    @ApiProperty({ type: 'number', description: 'Width of the image' })
    @IsNumber()
    @IsOptional()
    @Min(1)
    width?: number

    @ApiProperty({ type: 'number', description: 'Height of the image' })
    @IsNumber()
    @IsOptional()
    @Min(1)
    height?: number
}

class CardDto implements Card {
    @ApiProperty({ type: 'string', description: 'Title of the card' })
    @IsString()
    @Length(3, 50, { message: 'Title must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    title: string

    @ApiProperty({ type: 'string', description: 'Subtitle of the card' })
    @IsString()
    @Length(3, 50, { message: 'Title must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    subtitle?: string

    @ApiProperty({ type: 'string', description: 'Description of the card' })
    @IsString()
    @Length(3, 300, { message: 'Description must be between 3 and 300 characters' })
    @Transform(({ value }) => value?.trim())
    @IsOptional()
    description: string = ''

    @ApiProperty({ type: 'string', description: 'Link of the card' })
    @IsUrl()
    @IsOptional()
    link?: string

    @ApiProperty({ type: 'string', description: 'Image URL of the card' })
    @IsUrl()
    @IsOptional()
    image?: string
}

class CardsBlockDto implements CardsBlock {
    @ApiProperty({ enum: [EBlock.Cards] })
    @IsEnum([EBlock.Cards])
    type: EBlock.Cards = EBlock.Cards;

    @ApiProperty({ type: 'string', enum: ECardsBlockLayout, description: 'Layout of the cards' })
    @IsEnum(ECardsBlockLayout)
    layout: ECardsBlockLayout

    @ApiProperty({ type: CardDto, isArray: true })
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => CardDto)
    @ArrayMinSize(1, { message: 'At least one card is required' })
    cards: CardDto[]

    @ApiProperty({ type: 'number', description: 'Maximum number of columns' })
    @IsInt()
    @IsOptional()
    @Min(1)
    maxColumns: number = 1;
}

class RefItemBlockDto implements RefItemBlock {
    @ApiProperty({ enum: [EBlock.RefItem] })
    @IsEnum([EBlock.RefItem])
    type: EBlock.RefItem = EBlock.RefItem;

    @ApiProperty({ type: 'string', description: 'Reference of the items' })
    @IsString()
    @Length(3, 50, { message: 'Reference must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    ref: string;

    @ApiProperty({ type: 'number', description: 'Limit of the items' })
    @IsInt()
    @Min(1)
    @IsOptional()
    limit: number = 1;

    @ApiProperty({ type: 'string', enum: ['ASC', 'DESC'], description: 'Order of the items' })
    @IsEnum(['ASC', 'DESC'])
    @IsOptional()
    order?: 'ASC' | 'DESC' = 'DESC'

    @ApiProperty({ type: 'string', isArray: true, description: 'IDs of the specific items' })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    refIds?: string[] = []
}

class FormBlockDto implements FormBlock {
    @ApiProperty({ enum: [EBlock.Form] })
    @IsEnum([EBlock.Form])
    type: EBlock.Form = EBlock.Form;

    @ApiProperty({ type: 'string', format: 'uuid', description: 'Form ID' })
    @IsUUID()
    formId: string;
}

class PageBlocksDto {
    @ApiProperty({ type: 'string', enum: ['horizontal', 'vertical'], description: 'Direction of the blocks' })
    @IsEnum(['horizontal', 'vertical'])
    direction: 'horizontal' | 'vertical'

    @ApiProperty({ type: TextBlockDto, isArray: true })
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => BaseBlock, {
        keepDiscriminatorProperty: true,
        discriminator: {
            property: 'type',
            subTypes: [
                { value: TextBlockDto, name: EBlock.Text },
                { value: ImageBlockDto, name: EBlock.Image },
                { value: CardsBlockDto, name: EBlock.Cards },
                { value: RefItemBlockDto, name: EBlock.RefItem },
                { value: FormBlockDto, name: EBlock.Form },
            ],
        },
    })
    items: (TextBlockDto | ImageBlockDto | CardsBlockDto | RefItemBlockDto | FormBlockDto)[]
}

export class PageSectionDto {
    @ApiProperty({ type: 'string', description: 'Headline of the section' })
    @IsString()
    @Length(3, 50, { message: 'Headline must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    headline: string;

    @ApiProperty({ type: 'string', description: 'Subheadline of the section' })
    @IsString()
    @Length(10, 300, { message: 'Subheadline must be between 10 and 300 characters' })
    @Transform(({ value }) => value?.trim())
    subheadline?: string;

    @ApiPropertyOptional({ type: PageBlocksDto })
    @Type(() => PageBlocksDto)
    @ValidateNested()
    @IsArray()
    @IsOptional()
    blocks?: PageBlocksDto
}