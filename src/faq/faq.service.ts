import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, Repository } from "typeorm";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Faq } from "./entities/faq.entity";
import { CreateFaqDto } from "./dto/create-faq.dto";
import { FaqQueryDto } from "./dto/faq-query.dto";
import paginatedData from "src/utils/paginatedData";
import { UpdateFaqDto } from "./dto/update-faq.dto";

export class FaqService {
    constructor(
        @InjectRepository(Faq) private readonly faqRepo: Repository<Faq>,
    ) { }

    async create(createFaqDto: CreateFaqDto) {
        await this.faqRepo.save(createFaqDto);

        return { message: 'FAQ created' };
    }

    async findAll(queryDto: FaqQueryDto) {
        const queryBuilder = this.faqRepo.createQueryBuilder('faq')
            .orderBy("faq.createdAt", queryDto.order)
            .skip(queryDto.skip)
            .take(queryDto.take)
            .where(new Brackets(qb => {
                queryDto.search && qb.andWhere("LOWER(faq.title) LIKE :search", { search: `%${queryDto.search.toLocaleLowerCase()}%` });
                queryDto.category && qb.andWhere("faq.category = :category", { category: queryDto.category });
            }))
            .select([
                'faq.id',
                'faq.title',
                'faq.description',
                'faq.category',
            ])

        return paginatedData(queryDto, queryBuilder);

    }

    async findOne(id: string) {
        const existing = await this.faqRepo.findOne({
            where: { id },
            select: {
                id: true,
                category: true,
                title: true,
                description: true,
            }
        });
        if (!existing) throw new BadRequestException('FAQ not found');

        return existing;
    }

    async update(id: string, updateFaqDto: UpdateFaqDto) {
        const existing = await this.faqRepo.findOne({ where: { id }, select: { id: true } });
        if (!existing) throw new NotFoundException('FAQ not found');

        Object.assign(existing, updateFaqDto);
        await this.faqRepo.save(existing);

        return { message: 'FAQ updated' };
    }

    async remove(id: string) {
        return await this.faqRepo.delete({ id });
    }
}