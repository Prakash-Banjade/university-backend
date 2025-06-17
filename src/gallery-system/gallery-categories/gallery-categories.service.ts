import { ConflictException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateGalleryCategoryDto } from './dto/create-gallery-category.dto';
import { UpdateGalleryCategoryDto } from './dto/update-gallery-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GalleryCategory } from './entities/gallery-category.entity';
import { DataSource, ILike, Repository } from 'typeorm';
import { GalleryImagesService } from '../gallery-images/gallery-images.service';
import { BaseRepository } from 'src/common/repository/base-repository';
import { REQUEST } from '@nestjs/core';
import { FastifyRequest } from 'fastify';

@Injectable({ scope: Scope.REQUEST })
export class GalleryCategoriesService extends BaseRepository {
  constructor(
    dataSource: DataSource, @Inject(REQUEST) req: FastifyRequest,
    @InjectRepository(GalleryCategory) private readonly galleryCategoryRepo: Repository<GalleryCategory>,
    private readonly galleryImagesService: GalleryImagesService
  ) { super(dataSource, req) }

  async create(dto: CreateGalleryCategoryDto) {
    const existingWithSameName = await this.galleryCategoryRepo.findOne({ where: { name: ILike(dto.name) }, select: { id: true } });
    if (existingWithSameName) throw new ConflictException('Gallery category with same name already exists');

    const galleryCategory = this.galleryCategoryRepo.create(dto);
    await this.galleryCategoryRepo.save(galleryCategory);

    return { message: 'Gallery category created' }
  }

  async findAll() {
    const querybuilder = this.galleryCategoryRepo.createQueryBuilder('gc')
      .select([
        'gc.id as id',
        'gc.name as name'
      ]);

    return querybuilder.getRawMany();
  }

  async update(id: string, dto: UpdateGalleryCategoryDto) {
    const existing = await this.galleryCategoryRepo.findOne({ where: { id }, select: { id: true, name: true } });
    if (!existing) throw new NotFoundException('Gallery category not found');

    // check if name is taken
    if (dto.name && (dto.name !== existing.name)) {
      const existingWithSameName = await this.galleryCategoryRepo.findOne({ where: { name: ILike(dto.name) }, select: { id: true } });
      if (existingWithSameName) throw new ConflictException('Gallery category with same name already exists');
    }

    existing.name = dto.name;
    await this.galleryCategoryRepo.save(existing);

    await this.galleryImagesService.updateImages({
      category: existing,
      addImageIds: dto.addImageIds,
      removeImageIds: dto.removeImageIds
    });

    return { message: 'Gallery category updated' };
  }

  async remove(id: string) {
    await this.galleryCategoryRepo.delete({ id });

    return { message: 'Gallery category removed' };
  }
}
