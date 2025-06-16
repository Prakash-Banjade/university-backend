import { Module } from '@nestjs/common';
import { HeroSectionsService } from './hero-sections.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroSection } from './entities/hero-section.entity';
import { ImagesModule } from 'src/file-management/images/images.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HeroSection,
    ]),
    ImagesModule,
  ],
  providers: [HeroSectionsService],
  exports: [HeroSectionsService],
})
export class HeroSectionsModule { }
