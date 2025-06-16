import { Module } from '@nestjs/common';
import { HeroSectionsModule } from './hero-section/hero-sections.module';
import { MetadatasModule } from './metadata/metadata.module';

@Module({
    imports: [
        HeroSectionsModule,
        MetadatasModule,
    ],
})
export class PagesModule { }
