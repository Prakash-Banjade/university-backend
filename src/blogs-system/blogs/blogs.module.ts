import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { ImagesModule } from 'src/file-management/images/images.module';
import { BlogCategoriesModule } from '../blog-categories/blog-categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Blog,
    ]),
    ImagesModule,
    BlogCategoriesModule
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule { }
