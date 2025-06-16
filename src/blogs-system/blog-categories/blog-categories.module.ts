import { Module } from "@nestjs/common";
import { BlogCategoriesService } from "./blog-categories.service";
import { BlogCategoriesController } from "./blog-categories.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogCategory } from "./entities/blog-category.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BlogCategory
        ])
    ],
    controllers: [BlogCategoriesController],
    providers: [BlogCategoriesService],
    exports: [BlogCategoriesService]
})
export class BlogCategoriesModule { }