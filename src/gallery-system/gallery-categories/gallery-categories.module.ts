import { Module } from '@nestjs/common';
import { GalleryCategoriesService } from './gallery-categories.service';
import { GalleryCategoriesController } from './gallery-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryCategory } from './entities/gallery-category.entity';
import { GalleryImagesModule } from '../gallery-images/gallery-images.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GalleryCategory,
    ]),
    GalleryImagesModule
  ],
  controllers: [GalleryCategoriesController],
  providers: [GalleryCategoriesService],
})
export class GalleryCategoriesModule { }
