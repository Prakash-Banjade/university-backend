import { ConflictException, Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { Not, Repository } from 'typeorm';
import { generateSlug } from 'src/utils/generateSlug';
import { QueryDto } from 'src/common/dto/query.dto';
import paginatedData from 'src/utils/paginatedData';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form) private readonly formRepository: Repository<Form>
  ) { }

  async create(dto: CreateFormDto) {
    const slug = generateSlug(dto.title);

    const existingWithSameSlug = await this.formRepository.findOne({ where: { slug }, select: { id: true } });
    if (existingWithSameSlug) throw new ConflictException({ message: "Slug generated for this title already exists. Please choose different title." });

    const form = this.formRepository.create({
      ...dto,
      slug
    });

    await this.formRepository.save(form);

    return { message: 'Form created' };
  }

  findAll(queryDto: QueryDto) {
    const queryBuilder = this.formRepository.createQueryBuilder('form')
      .orderBy("form.createdAt", queryDto.order)
      .skip(queryDto.skip)
      .take(queryDto.take)

    return paginatedData(queryDto, queryBuilder);
  }

  async findOne(slug: string) {
    const form = await this.formRepository.findOne({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        fields: true
      }
    });

    if (!form) throw new ConflictException({ message: "Form with this slug doesn't exist." });

    return form;
  }

  async update(slug: string, updateFormDto: UpdateFormDto) {
    const existing = await this.formRepository.findOne({ where: { slug }, select: { id: true, title: true } });

    if (!existing) throw new ConflictException({ message: "Form with this slug doesn't exist." });

    Object.assign(existing, updateFormDto);

    if (updateFormDto.title && existing.title !== updateFormDto.title) existing.generateSlug();

    // check if the slug is taken
    const existingWithSameSlug = await this.formRepository.findOne({ where: { slug: existing.slug, id: Not(existing.id) }, select: { id: true } });
    if (existingWithSameSlug) throw new ConflictException({ message: "Slug generated for this title already exists. Please choose different title." });

    await this.formRepository.save(existing);

    return { message: 'Form updated successfully' }
  }

  remove(slug: string) {
    return this.formRepository.delete({ slug });
  }
}
