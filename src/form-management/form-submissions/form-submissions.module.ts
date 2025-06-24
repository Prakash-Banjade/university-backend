import { Module } from '@nestjs/common';
import { FormSubmissionsService } from './form-submissions.service';
import { FormSubmissionsController } from './form-submissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormSubmission } from './entities/form-submission.entity';
import { FormsModule } from '../forms/forms.module';
import { Job } from 'src/jobs-system/jobs/entities/job.entity';
import { Course } from 'src/courses/entities/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FormSubmission,
      Job,
      Course
    ]),
    FormsModule,
  ],
  controllers: [FormSubmissionsController],
  providers: [FormSubmissionsService],
})
export class FormSubmissionsModule { }
