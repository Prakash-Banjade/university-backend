import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { JobApplicationsModule } from './job-applications/job-applications.module';

@Module({
  imports: [JobsModule, JobApplicationsModule]
})
export class JobsSystemModule {}
