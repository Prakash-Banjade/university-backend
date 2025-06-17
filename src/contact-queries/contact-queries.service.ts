import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ContactQuery } from "./entities/contact-query.entity";
import { ContactQueryDto } from "./dto/contact-query.dto";
import { QueryDto } from "src/common/dto/query.dto";
import paginatedData from "src/utils/paginatedData";

@Injectable()
export class ContactQueriesService {
  constructor(
    @InjectRepository(ContactQuery) private readonly contactQueryRepo: Repository<ContactQuery>,
  ) { }

  async create(contactQueryDto: ContactQueryDto) {
    const contactQuery = this.contactQueryRepo.create(contactQueryDto);
    await this.contactQueryRepo.save(contactQuery);

    return { message: "Thanks for contacting us" }
  }

  findAll(queryDto: QueryDto) {
    const queryBuilder = this.contactQueryRepo.createQueryBuilder('cq')
      .orderBy("contactQuery.createdAt", queryDto.order)
      .skip(queryDto.skip)
      .take(queryDto.take)
      .select([
        'cq.id',
        'cq.name',
        'cq.email',
        'cq.phone',
      ])

    return paginatedData(queryDto, queryBuilder);
  }

  async findOne(id: string) {
    const existing = await this.contactQueryRepo.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        message: true
      }
    });
    if (!existing) throw new NotFoundException('Contact query not found');

    return existing;
  }

  async remove(id: string) {
    await this.contactQueryRepo.delete({ id });

    return {
      message: 'Contact query removed',
    }
  }
}