import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateGalleryCategoryDto } from './create-gallery-category.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateGalleryCategoryDto extends PartialType(CreateGalleryCategoryDto) {
    @ApiPropertyOptional({ type: 'string', format: 'uuid', isArray: true, description: 'Add images to the gallery category' })
    @IsUUID('all', { each: true })
    @IsOptional()
    addImageIds: string[] = [];

    @ApiPropertyOptional({ type: 'string', format: 'uuid', isArray: true, description: 'Remove images from the gallery category' })
    @IsUUID('all', { each: true })
    @IsOptional()
    removeImageIds: string[] = [];
}
