import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyInfo } from './entities/company-info.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { CompanyInfoDto } from './dto/company-info.dto';

@Injectable()
export class CompanyInfoService {
    constructor(
        @InjectRepository(CompanyInfo) private readonly companyInfoRepo: Repository<CompanyInfo>,
    ) { }

    async set(dto: CompanyInfoDto) {
        const existing = await this.companyInfoRepo.findOne({
            where: { id: Not(IsNull()) },
            select: { id: true }
        });

        if (!existing) throw new NotFoundException('Company info not found. Please seed it first.');

        await this.companyInfoRepo.update(existing.id, dto);

        return { message: 'Company info updated' };
    }

    async get() {
        const existing = await this.companyInfoRepo.findOne({
            where: { id: Not(IsNull()) },
            select: {
                id: true,
                address: true,
                city: true,
                email: true,
                mapLink: true,
                phone: true,
                socialProfiles: true,
                emergencyPhone: true,
                workingHours: true
            }
        });

        if (!existing) throw new NotFoundException('Company info not found. Please seed it first.');

        return existing;
    }
}
