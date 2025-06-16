import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { ILike, Repository } from 'typeorm';
import { ImagesService } from 'src/file-management/images/images.service';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature) private readonly featuresRepo: Repository<Feature>,
    private readonly imagesService: ImagesService
  ) { }

  async create(dto: CreateFeatureDto) {
    const existingWithSameName = await this.featuresRepo.findOne({ where: { title: ILike(dto.title.trim()) }, select: { id: true } });
    if (existingWithSameName) throw new ConflictException('Feature with same name already exists');

    const image = dto.imageId ? await this.imagesService.findOne(dto.imageId) : null;

    const feature = this.featuresRepo.create({
      ...dto,
      image
    });
    await this.featuresRepo.save(feature);

    return { message: 'Feature created' }
  }

  findAll() {
    return this.featuresRepo.find({
      relations: { image: true },
      select: {
        id: true,
        title: true,
        description: true,
        image: { id: true, url: true }
      }
    });
  }

  async findOne(id: string) {
    const existing = await this.featuresRepo.findOne({
      where: { id },
      relations: { image: true },
      select: {
        id: true,
        title: true,
        image: { id: true },
      }
    });

    if (!existing) throw new NotFoundException('Feature not found');

    return existing;
  }

  async update(id: string, dto: UpdateFeatureDto) {
    const existing = await this.findOne(id);

    if (dto.title && dto.title.toLowerCase() !== existing.title.toLowerCase()) {
      const existingWithSameName = await this.featuresRepo.findOne({ where: { title: ILike(dto.title) }, select: { id: true } });
      if (existingWithSameName) throw new ConflictException('Feature with same name already exists');
    }

    Object.assign(existing, dto);

    if (dto.imageId && (!existing.image || existing.image.id !== dto.imageId)) {
      const image = await this.imagesService.findOne(dto.imageId);
      existing.image = image;
    }

    if (dto.imageId === null) existing.image = null;

    await this.featuresRepo.save(existing);

    return { message: 'Feature updated' };

  }

  remove(id: string) {
    return this.featuresRepo.delete({ id });
  }
}
