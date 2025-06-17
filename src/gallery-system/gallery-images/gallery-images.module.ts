import { Module } from '@nestjs/common';
import { GalleryImagesService } from './gallery-images.service';
import { GalleryImagesController } from './gallery-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/file-management/images/entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Image
    ])
  ],
  controllers: [GalleryImagesController],
  providers: [GalleryImagesService],
  exports: [GalleryImagesService],
})
export class GalleryImagesModule { }
