import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HeroSection } from './entities/hero-section.entity';
import { Repository } from 'typeorm';
import { HeroSectionDto } from './dto/hero-section.dto';
import { ImagesService } from 'src/file-management/images/images.service';

@Injectable()
export class HeroSectionsService {
  constructor(
    @InjectRepository(HeroSection) private readonly heroSectionRepo: Repository<HeroSection>,
    private readonly imagesService: ImagesService
  ) { }

  async set(heroSection: HeroSection, dto: HeroSectionDto) {
    // evaluate image
    const image = dto.imageId
      ? await this.imagesService.findOne(dto.imageId)
      : dto.imageId === null
        ? null
        : heroSection.image;

    heroSection.image = image;

    // save hero section
    Object.assign(heroSection, {
      ...dto,
    });

    return heroSection;
  }

}
