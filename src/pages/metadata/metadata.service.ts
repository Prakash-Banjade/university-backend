import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Metadata } from './entities/metadata.entity';
import { Repository } from 'typeorm';
import { MetadataDto } from './dto/metadata.dto';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(Metadata) private readonly metadataRepo: Repository<Metadata>,
  ) { }

  async update(pageSlug: string, dto: MetadataDto) {
    const metadata = await this.metadataRepo.findOne({ where: { page: { slug: pageSlug } }, select: { id: true } });

    if (!metadata) throw new NotFoundException('Metadata not found');

    Object.assign(metadata, dto);

    await this.metadataRepo.save(metadata);

    return { message: 'Metadata updated' };
  }

}
