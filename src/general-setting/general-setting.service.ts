import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneralSetting } from './entities/general-setting.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { GeneralSettingsDto } from './dto/general-settings.dto';
import { ImagesService } from 'src/file-management/images/images.service';

@Injectable()
export class GeneralSettingService {
    constructor(
        @InjectRepository(GeneralSetting) private readonly generalSettingRepo: Repository<GeneralSetting>,
        private readonly imagesService: ImagesService
    ) { }

    async set(dto: GeneralSettingsDto) {
        const existing = await this.generalSettingRepo.findOne({
            where: { id: Not(IsNull()) },
            relations: { logo: true, },
            select: { id: true, logo: { id: true } }
        });

        if (!existing) throw new NotFoundException("General setting not found. Pleaes seed it first");

        if (dto.logoId) {
            const logo = await this.imagesService.findOne(dto.logoId);
            existing.logo = logo;
        }

        if (dto.logoId === null) existing.logo = null;

        Object.assign(existing, dto);

        await this.generalSettingRepo.save(existing);

        return { message: 'General setting updated' };
    }

    async get() {
        const existing = await this.generalSettingRepo.findOne({
            where: { id: Not(IsNull()) },
            relations: { logo: true, },
            select: {
                id: true,
                companyName: true,
                logo: { id: true, url: true }
            }
        });

        if (!existing) throw new NotFoundException("General setting not found. Pleaes seed it first");

        return existing;
    }

    async getPrivacyPolicy() {
        const existing = await this.generalSettingRepo.findOne({
            where: { id: Not(IsNull()) },
            select: { privacyPolicy: true }
        });

        if (!existing) throw new NotFoundException("General setting not found. Pleaes seed it first");

        return existing;
    }

    async getTermsAndConditions() {
        const existing = await this.generalSettingRepo.findOne({
            where: { id: Not(IsNull()) },
            select: { termsAndConditions: true }
        });

        if (!existing) throw new NotFoundException("General setting not found. Pleaes seed it first");

        return existing;
    }

    async getFooterDescription() {
        const existing = await this.generalSettingRepo.findOne({
            where: { id: Not(IsNull()) },
            select: { footerDescription: true }
        });

        if (!existing) throw new NotFoundException("General setting not found. Pleaes seed it first");

        return existing;
    }
}
