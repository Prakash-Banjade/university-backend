import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Header } from './entities/header.entity';
import { UpdateHeaderDto } from './dto/update-header.dto';

@Injectable()
export class HeaderService {
  constructor(
    @InjectRepository(Header) private readonly headerRepo: Repository<Header>,
  ) { }

  async update(dto: UpdateHeaderDto) {
    let header = await this.headerRepo.findOne({ where: {} });
    if (!header) {
      header = this.headerRepo.create(dto);
    } else {
      Object.assign(header, dto);
    }
    await this.headerRepo.save(header);
    return { message: 'Header updated' };
  }

  async get() {
    return this.headerRepo.findOne({
      where: {},
      select: {
        id: true,
        navLinks: true,
      }
    });
  }
}
