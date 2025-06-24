import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { FormSubmissionsService } from './form-submissions.service';
import { CreateFormSubmissionDto } from './dto/create-form-submission.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/setPublicRoute.decorator';
import { FormSubmissionQueryDto } from './dto/form-submission-query.dto';
import { Throttle } from '@nestjs/throttler';

@ApiTags("Form Submissions")
@Controller('form-submissions')
export class FormSubmissionsController {
  constructor(private readonly formSubmissionsService: FormSubmissionsService) { }

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create a new form submission' })
  @Throttle({ default: { limit: 1, ttl: 60000 } }) // 1 request per minute
  create(@Body() createFormSubmissionDto: CreateFormSubmissionDto) {
    return this.formSubmissionsService.create(createFormSubmissionDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all form submissions' })
  findAll(@Query() queryDto: FormSubmissionQueryDto) {
    return this.formSubmissionsService.findAll(queryDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a specific form submission' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the form submission' })
  remove(@Param('id') id: string) {
    return this.formSubmissionsService.remove(id);
  }
}
