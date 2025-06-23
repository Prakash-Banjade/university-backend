import { Module } from '@nestjs/common';
import { FormSubmissionsService } from './form-submissions.service';
import { FormSubmissionsController } from './form-submissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormSubmission } from './entities/form-submission.entity';
import { FormsModule } from '../forms/forms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FormSubmission
    ]),
    FormsModule,
  ],
  controllers: [FormSubmissionsController],
  providers: [FormSubmissionsService],
})
export class FormSubmissionsModule { }
