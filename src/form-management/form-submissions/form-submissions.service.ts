import { BadRequestException, FileValidator, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFormSubmissionDto } from './dto/create-form-submission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { FormSubmission } from './entities/form-submission.entity';
import { FormsService } from '../forms/forms.service';
import { buildFormValidator, formatZodErrors } from 'src/common/utils';
import { FormSubmissionQueryDto } from './dto/form-submission-query.dto';
import paginatedData from 'src/utils/paginatedData';
import { CustomException } from 'src/common/CONSTANTS';
import { FormFieldDataSourceEntity } from '../forms/form-fields';
import { Job } from 'src/jobs-system/jobs/entities/job.entity';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class FormSubmissionsService {
  constructor(
    @InjectRepository(FormSubmission) private readonly formSubmissionRepo: Repository<FormSubmission>,
    @InjectRepository(Job) private readonly jobsRepo: Repository<Job>,
    @InjectRepository(Course) private readonly coursesRepo: Repository<Course>,
    private readonly formsService: FormsService,
  ) { }

  async create(dto: CreateFormSubmissionDto) {
    const form = await this.formsService.findOne(dto.formSlug, { id: true, fields: true });

    const validator = buildFormValidator(form.fields);

    const { success, data, error } = validator.safeParse(dto.data);

    if (!success) throw new BadRequestException(formatZodErrors(error), { cause: CustomException.FormValidationException });

    const relationFields = form.fields.filter(field => field.type === 'relation');

    const relations = await Promise.all(relationFields.map(async (field) => {
      const ds = field.dataSource;

      const fieldValue: string | string[] = data[field.name];

      if (ds.entity === FormFieldDataSourceEntity.Job) {
        const job = await this.jobsRepo.findOne({
          where: { id: Array.isArray(fieldValue) ? In(fieldValue) : fieldValue },
          select: { id: true, title: true }
        });

        if (typeof fieldValue === 'string' && !job) {
          throw new NotFoundException('Job not found');
        }

        return [
          field.name,
          {
            id: job.id,
            value: job.title
          }
        ]
      }

      if (ds.entity === FormFieldDataSourceEntity.Course) {
        const course = await this.coursesRepo.findOne({
          where: { id: Array.isArray(fieldValue) ? In(fieldValue) : fieldValue },
          select: { id: true, name: true }
        });

        if (typeof fieldValue === 'string' && !course) {
          throw new NotFoundException('Course not found');
        }

        return [
          field.name,
          {
            id: course.id,
            value: course.name
          }
        ]

      }
    }));

    const formSubmission = this.formSubmissionRepo.create({
      form,
      data: {
        ...data,
        ...Object.fromEntries(relations)
      },
    });

    await this.formSubmissionRepo.save(formSubmission);

    return { message: 'Successfully submitted' };
  }

  findAll(queryDto: FormSubmissionQueryDto) {
    const querybuilder = this.formSubmissionRepo.createQueryBuilder('fs')
      .orderBy("fs.createdAt", queryDto.order)
      .skip(queryDto.skip)
      .take(queryDto.take)
      .where("fs.formId = :formId", { formId: queryDto.formId })
      .select([
        'fs.id',
        'fs.data',
        'fs.createdAt'
      ])

    return paginatedData(queryDto, querybuilder);
  }

  async remove(id: string) {
    await this.formSubmissionRepo.delete({ id });

    return { message: 'Form submission removed' };
  }
}
