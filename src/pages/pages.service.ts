import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { Not, Repository } from 'typeorm';
import { CreatePageDto, UpdatePageDto } from './dto/page.dto';
import { HeroSection } from './hero-section/entities/hero-section.entity';
import { Metadata } from './metadata/entities/metadata.entity';
import { PageQueryDto, PageSelectKeys } from './dto/page-query.dto';

@Injectable()
export class PagesService {
    constructor(
        @InjectRepository(Page) private pagesRepository: Repository<Page>,
    ) { }

    async create(dto: CreatePageDto) {
        const existingPageWithSameName = await this.pagesRepository.findOne({ where: { name: dto.name }, select: { id: true } });
        if (existingPageWithSameName) throw new ConflictException('Page with same name already exists');

        const heroSection: HeroSection = new HeroSection();
        const metadata: Metadata = new Metadata();

        const page = this.pagesRepository.create({
            name: dto.name,
            heroSections: [heroSection],
            metadata: metadata
        });

        await this.pagesRepository.save(page);

        return { message: 'Page created successfully' }
    }

    findOne(slug: string, queryDto: PageQueryDto) {
        const querybuilder = this.pagesRepository.createQueryBuilder('page')
            .where('page.slug = :slug', { slug })
            .select(['page.id', 'page.name', 'page.slug']);

        if (queryDto.select?.includes(PageSelectKeys.heroSections)) {
            querybuilder.leftJoin('page.heroSections', 'heroSections')
                .leftJoin('heroSections.image', 'image')
                .addSelect([
                    'heroSections.id',
                    'heroSections.title',
                    'heroSections.subtitle',
                    'image.id',
                    'image.url',
                    'heroSections.cta'
                ]);
        }

        if (queryDto.select?.includes(PageSelectKeys.metadata)) {
            querybuilder.leftJoin('page.metadata', 'metadata')
                .addSelect([
                    'metadata.id',
                    'metadata.title',
                    'metadata.description',
                    'metadata.keywords'
                ]);
        }

        if (queryDto.select?.includes(PageSelectKeys.sections)) {
            querybuilder.addSelect('page.sections');
        }

        return querybuilder.getOne();
    }

    async update(slug: string, dto: UpdatePageDto) {
        const existing = await this.pagesRepository.findOne({ where: { slug }, select: { id: true, name: true } });

        if (!existing) throw new NotFoundException('Page not found');

        Object.assign(existing, dto);

        if (dto.name && existing.name !== dto.name) existing.generateSlug();

        // check if the slug is taken
        const existingWithSameSlug = await this.pagesRepository.findOne({ where: { slug: existing.slug, id: Not(existing.id) }, select: { id: true } });
        if (existingWithSameSlug) throw new ConflictException({ message: "Slug generated for this name already exists. Please choose different name." });

        await this.pagesRepository.save(existing);

        return { message: 'Page updated successfully' }
    }

    remove(slug: string) {
        return this.pagesRepository.delete({ slug });
    }
}
