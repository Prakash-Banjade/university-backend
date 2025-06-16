import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Brackets, Repository } from 'typeorm';
import { CoursesQueryDto } from './dto/courses-query.dto';
import paginatedData from 'src/utils/paginatedData';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private readonly courseRepo: Repository<Course>,
  ) { }

  async create(dto: CreateCourseDto) {
    const coverImage = dto.coverImageId
      ? await this.courseRepo.findOne({ where: { id: dto.coverImageId } })
      : null;

    const course = this.courseRepo.create({
      ...dto,
      coverImage,
    });

    course.generateSlug();
    await this.courseRepo.save(course);

    return { message: 'Course created' };
  }

  findAll(queryDto: CoursesQueryDto) {
    const querybuilder = this.courseRepo.createQueryBuilder('course')
      .take(queryDto.take)
      .skip(queryDto.skip)
      .where(new Brackets(qb => {
        if (queryDto.search) {
          qb.andWhere("LOWER(course.title) LIKE :search", { search: `${queryDto.search.toLowerCase()}%` });
        }

        if (queryDto.faculty) {
          qb.andWhere("course.faculty = :faculty", { faculty: queryDto.faculty });
        }

        if (queryDto.degree) {
          qb.andWhere("course.degree = :degree", { degree: queryDto.degree });
        }
      }))
      .select([
        'course.id',
        'course.name',
        'course.slug',
        'course.summary',
        'course.duration',
        'course.degree',
        'course.faculty',
        'course.eligibility',
      ]);

    return paginatedData(queryDto, querybuilder);
  }

  async findOne(slug: string) {
    const course = await this.courseRepo.findOne({
      where: { slug },
      select: {
        id: true,
        slug: true,
        name: true,
        summary: true,
        description: true,
        duration: true,
        degree: true,
        faculty: true,
        eligibility: true
      }
    });

    if (!course) throw new NotFoundException('Course not found');

    return course;
  }

  async update(slug: string, dto: UpdateCourseDto) {
    const existing = await this.courseRepo.findOne({
      where: { slug },
      relations: { coverImage: true },
      select: {
        id: true,
        name: true,
        degree: true,
        faculty: true,
        coverImage: { id: true }
      }
    });

    if (!existing) throw new NotFoundException('Course not found');

    const coverImage = dto.coverImageId && (!dto.coverImageId || existing.coverImage?.id !== dto.coverImageId)
      ? await this.courseRepo.findOne({ where: { id: dto.coverImageId } })
      : dto.coverImageId === null
        ? null
        : existing.coverImage;

    Object.assign(existing, {
      ...dto,
      coverImage
    });

    if (dto.name && existing.name !== dto.name) existing.generateSlug();

    await this.courseRepo.save(existing);

    return { message: 'Course updated' };
  }

  remove(slug: string) {
    return this.courseRepo.delete({ slug });
  }
}
