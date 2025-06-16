import { Module } from '@nestjs/common';
import { HeroSectionsService } from './hero-sections.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroSection } from './entities/hero-section.entity';
import { ImagesModule } from 'src/file-management/images/images.module';
import { HeroSectionsController } from './hero-sections.controller';
import { Page } from '../entities/page.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HeroSection,
      Page
    ]),
    ImagesModule,
  ],
  providers: [HeroSectionsService],
  controllers: [HeroSectionsController],
  exports: [HeroSectionsService],
})
export class HeroSectionsModule { }
