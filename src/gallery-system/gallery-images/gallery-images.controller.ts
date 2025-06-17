import { Controller, Get, Query } from '@nestjs/common';
import { GalleryImagesService } from './gallery-images.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/setPublicRoute.decorator';
import { GalleryImagesQueryDto } from './dto/gallery-images-query.dto';

@ApiTags('Gallery Images')
@Controller('gallery-images')
export class GalleryImagesController {
  constructor(private readonly galleryImagesService: GalleryImagesService) { }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all gallery images' })
  findAll(@Query() queryDto: GalleryImagesQueryDto) {
    return this.galleryImagesService.getImages(queryDto);
  }
}
