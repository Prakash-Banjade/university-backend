import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFormSubmissionDto } from './dto/create-form-submission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormSubmission } from './entities/form-submission.entity';
import { FormsService } from '../forms/forms.service';
import { buildFormValidator, formatZodErrors } from 'src/common/utils';
import { FormSubmissionQueryDto } from './dto/form-submission-query.dto';
import paginatedData from 'src/utils/paginatedData';

@Injectable()
export class FormSubmissionsService {
  constructor(
    @InjectRepository(FormSubmission) private readonly formSubmissionRepo: Repository<FormSubmission>,
    private readonly formsService: FormsService,
  ) { }

  async create(dto: CreateFormSubmissionDto) {
    const form = await this.formsService.findOne(dto.formSlug, { id: true, fields: true });

    const validator = buildFormValidator(form.fields);

    const { success, data, error } = validator.safeParse(dto.data);

    if (!success) throw new BadRequestException({ message: formatZodErrors(error) });

    const formSubmission = this.formSubmissionRepo.create({ form, data });

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
