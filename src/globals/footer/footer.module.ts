import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Footer } from './entities/footer.entity';
import { FooterController } from './footer.controller';
import { FooterService } from './footer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Footer])],
  controllers: [FooterController],
  providers: [FooterService],
})
export class FooterModule { }
