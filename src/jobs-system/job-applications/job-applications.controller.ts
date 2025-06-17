import { Controller, Get, Post, Body, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { Throttle } from '@nestjs/throttler';
import { Public } from 'src/common/decorators/setPublicRoute.decorator';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JobApplicationsQueryDto } from './dto/job-applications-query.dto';

@ApiTags('Job Applications')
@Controller('job-applications')
export class JobApplicationsController {
  constructor(private readonly jobApplicationsService: JobApplicationsService) { }

  @Post()
  @Public()
  @ApiOperation({ summary: 'Submit job application' })
  @Throttle({ default: { limit: 1, ttl: 60000 } }) // 1 request per minute
  create(@Body() createJobApplicationDto: CreateJobApplicationDto) {
    return this.jobApplicationsService.create(createJobApplicationDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all job applications' })
  findAll(@Query() queryDto: JobApplicationsQueryDto) {
    return this.jobApplicationsService.findAll(queryDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get job application by id' })
  @ApiNotFoundResponse({ description: 'Job application not found' })
  @ApiParam({ name: 'id', description: 'Job application id' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.jobApplicationsService.findOne(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete job application by id' })
  @ApiParam({ name: 'id', description: 'Job application id' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.jobApplicationsService.remove(id);
  }
}
