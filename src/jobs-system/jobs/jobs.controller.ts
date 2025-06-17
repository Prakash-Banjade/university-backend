import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/setPublicRoute.decorator';
import { JobsQueryDto } from './dto/jobs-query.dto';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new job' })
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all jobs' })
  findAll(@Query() queryDto: JobsQueryDto) {
    return this.jobsService.findAll(queryDto);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get a job by id' })
  @ApiParam({ name: 'id', description: "Id of the job" })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a job by id' })
  @ApiParam({ name: 'id', description: "Id of the job" })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job by id' })
  @ApiParam({ name: 'id', description: "Id of the job" })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.jobsService.remove(id);
  }
}
