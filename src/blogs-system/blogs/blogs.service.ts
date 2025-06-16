import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { blogsSelectCols } from './entities/blogs-select-cols.config';
import { BlogsQueryDto } from './dto/blogs-query.dto';
import { ImagesService } from 'src/file-management/images/images.service';
import { BlogCategoriesService } from '../blog-categories/blog-categories.service';
import { applySelectColumns } from 'src/utils/apply-select-cols';
import paginatedData from 'src/utils/paginatedData';
import { generateSlug } from 'src/utils/generateSlug';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepo: Repository<Blog>,
    private readonly imagesService: ImagesService,
    private readonly blogCategoriesService: BlogCategoriesService
  ) { }

  async create(createBlogDto: CreateBlogDto) {
    const category = await this.blogCategoriesService.findOne(createBlogDto.categoryId);

    const featuredImage = await this.imagesService.findOne(createBlogDto.featuredImageId);
    const coverImage = createBlogDto.coverImageId ? await this.imagesService.findOne(createBlogDto.coverImageId) : null;

    const blog = this.blogRepo.create({
      ...createBlogDto,
      featuredImage,
      coverImage,
      category,
      slug: generateSlug(createBlogDto.title, true),
    });

    await this.blogRepo.save(blog);

    return { message: 'Blog created' }
  }

  async findAll(queryDto: BlogsQueryDto) {
    const queryBuilder = this.blogRepo.createQueryBuilder('blog');

    queryBuilder
      .orderBy("blog.createdAt", queryDto.order)
      .skip(queryDto.skip)
      .take(queryDto.take)
      .leftJoin("blog.featuredImage", "featuredImage")
      .leftJoin("blog.coverImage", "coverImage")
      .leftJoin("blog.category", "category")
      .where(new Brackets(qb => {
        queryDto.search && qb.andWhere("LOWER(blog.title) LIKE :search", { search: `%${queryDto.search.toLowerCase()}%` });
        queryDto.category.length && qb.andWhere("category.name IN (:...blogType)", { blogType: queryDto.category });
      }))

    applySelectColumns(queryBuilder, blogsSelectCols, 'blog');

    return paginatedData(queryDto, queryBuilder);
  }

  async findOne(slug: string) {
    const foundBlog = await this.blogRepo.findOne({
      where: { slug },
      relations: {
        featuredImage: true,
        coverImage: true,
        category: true,
      },
      select: {
        ...blogsSelectCols,
        content: true,
      },
    });
    if (!foundBlog) throw new NotFoundException('Blog not found');

    return foundBlog;
  }

  async update(slug: string, updateBlogDto: UpdateBlogDto) {
    const existing = await this.blogRepo.findOne({
      where: { slug },
      relations: {
        featuredImage: true,
        coverImage: true,
        category: true,
      },
      select: {
        id: true,
        title: true,
        featuredImage: { id: true },
        coverImage: { id: true },
        category: { id: true },
      }
    });

    if (!existing) throw new NotFoundException('Blog not found');

    const featuredImage = updateBlogDto.featuredImageId && (existing.featuredImage?.id !== updateBlogDto.featuredImageId)
      ? await this.imagesService.findOne(updateBlogDto.featuredImageId)
      : existing.featuredImage;

    const coverImage = updateBlogDto.coverImageId
      ? await this.imagesService.findOne(updateBlogDto.coverImageId)
      : updateBlogDto.coverImageId === null
        ? null
        : existing.coverImage;

    const category = updateBlogDto.categoryId
      ? await this.blogCategoriesService.findOne(updateBlogDto.categoryId)
      : existing.category;

    if (updateBlogDto.title && existing.title !== updateBlogDto.title) {
      existing.slug = generateSlug(updateBlogDto.title, true);
    }

    Object.assign(existing, { ...updateBlogDto, featuredImage, coverImage, category });

    await this.blogRepo.save(existing);

    return { message: 'Blog updated' }
  }

  async remove(slug: string) {
    this.blogRepo.delete({ slug });
  }
}
