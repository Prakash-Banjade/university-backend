import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { BlogCategory } from "./entities/blog-category.entity";
import { BlogCategoryDto } from "./dto/blog-category.dto";

@Injectable()
export class BlogCategoriesService {
    constructor(
        @InjectRepository(BlogCategory) private readonly blogCategoriesRepo: Repository<BlogCategory>,
    ) { }

    async create(dto: BlogCategoryDto) {
        const existingWithSameName = await this.blogCategoriesRepo.findOne({ where: { name: ILike(dto.name.trim()) }, select: { id: true } });
        if (existingWithSameName) throw new ConflictException('Blog type with same name already exists');

        const blogCategorie = this.blogCategoriesRepo.create(dto);
        await this.blogCategoriesRepo.save(blogCategorie);

        return { message: 'Blog type created' }
    }

    async findAll() {
        return this.blogCategoriesRepo.createQueryBuilder('category')
            .leftJoin('category.blogs', 'blogs')
            .select([
                'category.id as id',
                'category.name as name',
                'COUNT(blogs.id) as blogsCount'
            ])
            .groupBy('category.id')
            .getRawMany();
    }

    async getOptions() {
        return this.blogCategoriesRepo.createQueryBuilder('category')
            .select([
                'category.id as value',
                'category.name as label'
            ])
            .getRawMany();
    }

    async findOne(id: string) {
        const blogCategorie = await this.blogCategoriesRepo.findOne({ where: { id }, select: { id: true, name: true } });
        if (!blogCategorie) throw new NotFoundException('Blog category not found');

        return blogCategorie;
    }

    async update(id: string, dto: BlogCategoryDto) {
        const blogCategorie = await this.findOne(id);

        if (blogCategorie.name !== dto.name.trim()) {
            const existingWithSameName = await this.blogCategoriesRepo.findOne({ where: { name: ILike(dto.name.trim()) }, select: { id: true } });
            if (existingWithSameName) throw new ConflictException('Blog category with same name already exists');
        }

        blogCategorie.name = dto.name;
        await this.blogCategoriesRepo.save(blogCategorie);

        return { message: 'Blog Category updated' }
    }

    async remove(id: string) {
        const blogCategorie = await this.findOne(id);
        await this.blogCategoriesRepo.remove(blogCategorie);
        return {
            message: 'Blog type removed',
            blogCategorie: {
                id: blogCategorie.id,
                name: blogCategorie.name
            }
        }
    }
}