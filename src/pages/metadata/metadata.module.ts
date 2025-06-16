import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metadata } from './entities/metadata.entity';
import { MetadataService } from './metadata.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Metadata,
    ]),
  ],
  providers: [MetadataService],
  exports: [MetadataService],
})
export class MetadatasModule { }
