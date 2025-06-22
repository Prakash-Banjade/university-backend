import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormSubmissionsService } from './form-submissions.service';
import { CreateFormSubmissionDto } from './dto/create-form-submission.dto';
import { UpdateFormSubmissionDto } from './dto/update-form-submission.dto';

@Controller('form-submissions')
export class FormSubmissionsController {
  constructor(private readonly formSubmissionsService: FormSubmissionsService) {}

  @Post()
  create(@Body() createFormSubmissionDto: CreateFormSubmissionDto) {
    return this.formSubmissionsService.create(createFormSubmissionDto);
  }

  @Get()
  findAll() {
    return this.formSubmissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formSubmissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormSubmissionDto: UpdateFormSubmissionDto) {
    return this.formSubmissionsService.update(+id, updateFormSubmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formSubmissionsService.remove(+id);
  }
}
