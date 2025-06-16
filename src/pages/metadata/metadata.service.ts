import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Metadata } from './entities/metadata.entity';
import { Repository } from 'typeorm';
import { MetadataDto } from './dto/metadata.dto';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(Metadata) private readonly metadataRepo: Repository<Metadata>,
  ) { }

  async set(metadata: Metadata, dto: MetadataDto) {
    // save hero section
    Object.assign(metadata, dto);

    return this.metadataRepo.save(metadata);
  }

}
