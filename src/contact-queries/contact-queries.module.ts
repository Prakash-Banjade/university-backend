import { Module } from '@nestjs/common';
import { ContactQueriesService } from './contact-queries.service';
import { ContactQueriesController } from './contact-queries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactQuery } from './entities/contact-query.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContactQuery
    ])
  ],
  controllers: [ContactQueriesController],
  providers: [ContactQueriesService],
})
export class ContactQueriesModule { }
