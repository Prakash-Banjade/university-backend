import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Footer } from './entities/footer.entity';
import { UpdateFooterDto } from './dto/update-footer.dto';

@Injectable()
export class FooterService {
  constructor(
    @InjectRepository(Footer) private readonly footerRepo: Repository<Footer>,
  ) { }

  async update(dto: UpdateFooterDto) {
    let footer = await this.footerRepo.findOne({ where: {} });
    if (!footer) {
      footer = this.footerRepo.create(dto);
    } else {
      Object.assign(footer, dto);
    }
    await this.footerRepo.save(footer);
    return { message: 'Footer updated' };
  }

  async get() {
    return this.footerRepo.findOne({ where: {} });
  }
}
