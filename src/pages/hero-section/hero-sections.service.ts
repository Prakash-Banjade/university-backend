import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HeroSection } from './entities/hero-section.entity';
import { Repository } from 'typeorm';
import { HeroSectionDto } from './dto/hero-section.dto';
import { ImagesService } from 'src/file-management/images/images.service';
import { Page } from '../entities/page.entity';

@Injectable()
export class HeroSectionsService {
  constructor(
    @InjectRepository(HeroSection) private readonly heroSectionRepo: Repository<HeroSection>,
    @InjectRepository(Page) private pagesRepository: Repository<Page>,
    private readonly imagesService: ImagesService
  ) { }

  async update(pageSlug: string, dto: HeroSectionDto) {
    const page = await this.pagesRepository.findOne({
      where: { slug: pageSlug },
      relations: { heroSections: true },
      select: { id: true, heroSections: { id: true } }
    });

    if (!page) throw new NotFoundException('Page not found');

    const image = dto.imageId ? await this.imagesService.findOne(dto.imageId) : null;

    if (dto.id) {
      const heroSection = page.heroSections.find(heroSection => heroSection.id === dto.id);
      if (!heroSection) throw new NotFoundException(`Hero section with id ${dto.id} not found`);

      Object.assign(heroSection, dto, { page, image });
      await this.heroSectionRepo.save(heroSection);

    } else {
      const heroSection = this.heroSectionRepo.create({ ...dto, page, image });
      await this.heroSectionRepo.save(heroSection);
    }

    return { message: 'Hero section updated' }
  }

  delete(id: string) {
    this.heroSectionRepo.delete({ id });
  }
}
