import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GalleryCategory } from '../gallery-categories/entities/gallery-category.entity';
import { DataSource, In, Repository } from 'typeorm';
import { Image } from 'src/file-management/images/entities/image.entity';
import { GalleryImagesQueryDto } from './dto/gallery-images-query.dto';
import paginatedData from 'src/utils/paginatedData';
import { BaseRepository } from 'src/common/repository/base-repository';
import { REQUEST } from '@nestjs/core';
import { FastifyRequest } from 'fastify';

@Injectable({ scope: Scope.REQUEST })
export class GalleryImagesService extends BaseRepository {
    constructor(
        dataSource: DataSource, @Inject(REQUEST) req: FastifyRequest,
        @InjectRepository(Image) private readonly imageRepo: Repository<Image>,
    ) { super(dataSource, req) }


    async getImages(queryDto: GalleryImagesQueryDto) {
        const querybuilder = this.imageRepo.createQueryBuilder('image')
            .orderBy("image.createdAt", queryDto.order)
            .skip(queryDto.skip)
            .take(queryDto.take);

        if (queryDto.category) {
            querybuilder
                .leftJoin("image.galleryCategory", "category")
                .where("category.name = :category", { category: queryDto.category });
        } else {
            querybuilder.where("image.galleryCategoryId IS NOT NULL");
        }

        return paginatedData(queryDto, querybuilder);
    }

    async updateImages({ category, addImageIds, removeImageIds }: { category: GalleryCategory, addImageIds: string[], removeImageIds: string[] }) {
        await this.imageRepo.delete({ id: In(removeImageIds) });

        if (addImageIds.length) {
            await this.imageRepo.update({ id: In(addImageIds) }, { galleryCategory: category });
        }
    }
}
