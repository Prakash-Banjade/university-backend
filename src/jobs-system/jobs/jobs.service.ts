import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Brackets, FindOptionsSelect, Repository } from 'typeorm';
import { JobsQueryDto } from './dto/jobs-query.dto';
import paginatedData from 'src/utils/paginatedData';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private readonly jobRepo: Repository<Job>,
  ) { }

  async create(createJobDto: CreateJobDto) {
    const job = this.jobRepo.create(createJobDto);
    await this.jobRepo.save(job);

    return { message: 'Job created' };
  }

  findAll(queryDto: JobsQueryDto) {
    const querybuilder = this.jobRepo.createQueryBuilder('job')
      .orderBy("job.createdAt", queryDto.order)
      .where(new Brackets(qb => {
        if (queryDto.search) {
          qb.andWhere("LOWER(job.title) LIKE :search", { search: `${queryDto.search.toLowerCase()}%` });
        }

        if (queryDto.department) {
          qb.andWhere("job.department = :department", { department: queryDto.department });
        }

        if (queryDto.type) {
          qb.andWhere("job.type = :type", { type: queryDto.type });
        }

        if (queryDto.status) {
          qb.andWhere("job.status = :status", { status: queryDto.status });
        }
      }))

    if (queryDto.asOptions) {
      querybuilder.select([
        'job.id' as 'value',
        'job.title' as 'label'
      ]);

      return querybuilder.getRawMany();
    }

    querybuilder
      .skip(queryDto.skip)
      .take(queryDto.take)
      .select([
        'job.id',
        'job.title',
        'job.status',
        'job.department',
        'job.type',
        'job.createdAt'
      ]);

    return paginatedData(queryDto, querybuilder);
  }

  async findOne(id: string, select?: FindOptionsSelect<Job>) {
    const existing = await this.jobRepo.findOne({
      where: { id },
      select: select ?? {
        id: true,
        title: true,
        description: true,
        status: true,
        department: true,
        type: true,
        createdAt: true
      }
    });

    if (!existing) throw new NotFoundException('Job not found');

    return existing;
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    const existing = await this.jobRepo.findOne({ where: { id }, select: { id: true } });

    if (!existing) throw new NotFoundException('Job not found');

    await this.jobRepo.update({ id }, updateJobDto);

    return { message: 'Job updated' };
  }

  async remove(id: string) {
    await this.jobRepo.delete({ id });

    return { message: 'Job removed' }
  }
}
