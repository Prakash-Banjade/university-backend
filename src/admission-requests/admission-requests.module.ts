import { Module } from '@nestjs/common';
import { AdmissionRequestsService } from './admission-requests.service';
import { AdmissionRequestsController } from './admission-requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmissionRequest } from './entities/admission-request.entity';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdmissionRequest
    ]),
    CoursesModule,
  ],
  controllers: [AdmissionRequestsController],
  providers: [AdmissionRequestsService],
})
export class AdmissionRequestsModule { }
