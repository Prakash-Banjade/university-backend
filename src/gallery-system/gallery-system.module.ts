import { Module } from '@nestjs/common';
import { GalleryCategoriesModule } from './gallery-categories/gallery-categories.module';
import { GalleryImagesModule } from './gallery-images/gallery-images.module';

@Module({
  imports: [GalleryCategoriesModule, GalleryImagesModule]
})
export class GallerySystemModule {}
