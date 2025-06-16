import { Module } from '@nestjs/common';
import { GeneralSettingService } from './general-setting.service';
import { GeneralSettingController } from './general-setting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralSetting } from './entities/general-setting.entity';
import { ImagesModule } from 'src/file-management/images/images.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GeneralSetting,
    ]),
    ImagesModule,
  ],
  controllers: [GeneralSettingController],
  providers: [GeneralSettingService],
})
export class GeneralSettingModule {}
