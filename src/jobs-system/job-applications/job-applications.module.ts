import { Module } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { JobApplicationsController } from './job-applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from './entities/job-application.entity';
import { JobsModule } from '../jobs/jobs.module';
import { FilesModule } from 'src/file-management/files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JobApplication,
    ]),
    JobsModule,
    FilesModule,
  ],
  controllers: [JobApplicationsController],
  providers: [JobApplicationsService],
})
export class JobApplicationsModule { }
