import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, Repository } from "typeorm";
import { AdmissionRequest } from "./entities/admission-request.entity";
import { AdmissionRequestDto } from "./dto/admission-request.dto";
import { QueryDto } from "src/common/dto/query.dto";
import paginatedData from "src/utils/paginatedData";
import { CoursesService } from "src/courses/courses.service";
import { AdmissionRequestQueryDto } from "./dto/admission-request-query.dto";

@Injectable()
export class AdmissionRequestsService {
  constructor(
    @InjectRepository(AdmissionRequest) private readonly admissionRequestRepo: Repository<AdmissionRequest>,
    private readonly coursesService: CoursesService
  ) { }

  async create(dto: AdmissionRequestDto) {
    const course = await this.coursesService.findOne(dto.courseSlug, { id: true })

    const admissionRequest = this.admissionRequestRepo.create({
      ...dto,
      course
    });
    await this.admissionRequestRepo.save(admissionRequest);

    return { message: "Thanks for applying" }
  }

  findAll(queryDto: AdmissionRequestQueryDto) {
    const queryBuilder = this.admissionRequestRepo.createQueryBuilder('ar')
      .orderBy("admissionRequest.createdAt", queryDto.order)
      .skip(queryDto.skip)
      .take(queryDto.take)
      .leftJoin('ar.course', 'course');

    if (queryDto.courseSlug) {
      queryBuilder.where("course.slug = :courseSlug", { courseSlug: queryDto.courseSlug });
    }

    queryBuilder.select([
      'ar.id',
      'ar.firstName',
      'ar.lastName',
      'ar.email',
      'ar.phone',
      'ar.address',
      'course.id',
      'course.slug',
      'course.name',
    ]);

    return paginatedData(queryDto, queryBuilder);
  }

  async findOne(id: string) {
    const existing = await this.admissionRequestRepo.findOne({
      where: { id },
      relations: { course: true },
      select: {
        id: true,
        firsName: true,
        lastName: true,
        email: true,
        phone: true,
        course: {
          id: true,
          name: true,
          slug: true,
          faculty: true,
          degree: true,
        }
      }
    });
    if (!existing) throw new NotFoundException('Contact query not found');

    return existing;
  }

  async remove(id: string) {
    await this.admissionRequestRepo.delete({ id });

    return {
      message: 'Contact query removed',
    }
  }
}