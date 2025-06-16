import { Body, Controller, Get, Patch } from '@nestjs/common';
import { CompanyInfoService } from './company-info.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CompanyInfoDto } from './dto/company-info.dto';
import { Public } from 'src/common/decorators/setPublicRoute.decorator';

@ApiTags('Company info')
@Controller('company-info')
export class CompanyInfoController {
  constructor(private readonly companyInfoService: CompanyInfoService) { }

  @Patch()
  @ApiBearerAuth()
  set(@Body() dto: CompanyInfoDto) {
    return this.companyInfoService.set(dto);
  }

  @Public()
  @Get()
  get() {
    return this.companyInfoService.get();
  }
}
