import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobApplication } from './entities/job-application.entity';
import { Brackets, Repository } from 'typeorm';
import paginatedData from 'src/utils/paginatedData';
import { JobsService } from '../jobs/jobs.service';
import { FilesService } from 'src/file-management/files/files.service';
import { EFileMimeType } from 'src/common/types/global.type';
import { JobApplicationsQueryDto } from './dto/job-applications-query.dto';
import { EJobStatus } from '../jobs/entities/job.entity';

@Injectable()
export class JobApplicationsService {
  constructor(
    @InjectRepository(JobApplication) private readonly jobApplicationsRepo: Repository<JobApplication>,
    private readonly jobsService: JobsService,
    private readonly filesService: FilesService
  ) { }

  async create(dto: CreateJobApplicationDto) {
    const job = await this.jobsService.findOne(dto.jobId, { id: true, status: true });

    if (job.status === EJobStatus.Closed) throw new BadRequestException('Job is closed');

    const resume = await this.filesService.findOne({ id: dto.resumeId, mimeType: EFileMimeType.PDF });

    const jobApplication = this.jobApplicationsRepo.create({
      ...dto,
      job,
      resume
    });

    await this.jobApplicationsRepo.save(jobApplication);

    return { message: 'Application submitted' };
  }

  findAll(queryDto: JobApplicationsQueryDto) {
    const querybuilder = this.jobApplicationsRepo.createQueryBuilder('ja')
      .orderBy("ja.createdAt", queryDto.order)
      .skip(queryDto.skip)
      .take(queryDto.take)
      .where(new Brackets(qb => {
        if (queryDto.search) {
          qb.andWhere("LOWER(ja.fullname) LIKE :search", { search: `${queryDto.search.toLowerCase()}%` });
        }

        if (queryDto.jobId) {
          qb.andWhere("ja.jobId = :jobId", { jobId: queryDto.jobId });
        }
      }))
      .select([
        'ja.id',
        'ja.fullname',
        'ja.email',
        'ja.phone',
        'ja.createdAt',
      ]);

    return paginatedData(queryDto, querybuilder);
  }

  async findOne(id: string) {
    const existing = await this.jobApplicationsRepo.findOne({
      where: { id },
      relations: { job: true, resume: true },
      select: {
        id: true,
        fullname: true,
        email: true,
        phone: true,
        createdAt: true,
        currentDesignation: true,
        currentOrganization: true,
        currentSalary: true,
        expectedSalary: true,
        noticePeriod: true,
        qualification: true,
        job: { id: true, title: true, department: true, type: true },
        resume: { id: true, url: true }
      }
    });

    if (!existing) throw new NotFoundException('Application not found');

    return existing;
  }

  async remove(id: string) {
    await this.jobApplicationsRepo.delete({ id });

    return { message: 'Application removed' };
  }
}
