import { Injectable } from '@nestjs/common';
import { CreateFormSubmissionDto } from './dto/create-form-submission.dto';
import { UpdateFormSubmissionDto } from './dto/update-form-submission.dto';

@Injectable()
export class FormSubmissionsService {
  create(createFormSubmissionDto: CreateFormSubmissionDto) {
    return 'This action adds a new formSubmission';
  }

  findAll() {
    return `This action returns all formSubmissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formSubmission`;
  }

  update(id: number, updateFormSubmissionDto: UpdateFormSubmissionDto) {
    return `This action updates a #${id} formSubmission`;
  }

  remove(id: number) {
    return `This action removes a #${id} formSubmission`;
  }
}
