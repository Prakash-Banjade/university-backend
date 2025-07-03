import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Header } from './entities/header.entity';
import { HeaderController } from './header.controller';
import { HeaderService } from './header.service';

@Module({
  imports: [TypeOrmModule.forFeature([Header])],
  controllers: [HeaderController],
  providers: [HeaderService],
})
export class HeaderModule { }
