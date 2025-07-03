import { Body, Controller, Get, Patch } from '@nestjs/common';
import { GeneralSettingService } from './general-setting.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GeneralSettingsDto } from './dto/general-settings.dto';
import { Public } from 'src/common/decorators/setPublicRoute.decorator';

@ApiTags('General Setting')
@Controller('general-setting')
export class GeneralSettingController {
  constructor(private readonly generalSettingService: GeneralSettingService) { }

  @Patch()
  @ApiBearerAuth()
  async set(@Body() dto: GeneralSettingsDto) {
    return this.generalSettingService.set(dto);
  }

  @Get()
  @Public()
  async get() {
    return this.generalSettingService.get();
  }

  @Get('privacy-policy')
  @Public()
  async getPrivacyPolicy() {
    return this.generalSettingService.getPrivacyPolicy();
  }

  @Get('terms-and-condition')
  @Public()
  async getTermsAndConditions() {
    return this.generalSettingService.getTermsAndConditions();
  }
}
