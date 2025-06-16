import { Module } from '@nestjs/common';
import { CompanyInfoService } from './company-info.service';
import { CompanyInfoController } from './company-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyInfo } from './entities/company-info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyInfo
    ])
  ],
  controllers: [CompanyInfoController],
  providers: [CompanyInfoService],
})
export class CompanyInfoModule { }
