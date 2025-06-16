import { Module } from '@nestjs/common';
import { BlogsModule } from './blogs/blogs.module';
import { BlogCategoriesModule } from './blog-categories/blog-categories.module';

@Module({
    imports: [
        BlogsModule,
        BlogCategoriesModule,
    ]
})
export class BlogsSystemModule { }
