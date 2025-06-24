import { Module } from '@nestjs/common';
import { HeroSectionsModule } from './hero-section/hero-sections.module';
import { MetadatasModule } from './metadata/metadata.module';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Page,
        ]),
        HeroSectionsModule,
        MetadatasModule,
    ],
    controllers: [PagesController],
    providers: [PagesService],
    exports: [PagesService],
})
export class PagesModule { }
