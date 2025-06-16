import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { ImagesModule } from 'src/file-management/images/images.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Feature,
    ]),
    ImagesModule,
  ],
  controllers: [FeaturesController],
  providers: [FeaturesService],
})
export class FeaturesModule {}
