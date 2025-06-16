import { Global, Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Account } from 'src/auth-system/accounts/entities/account.entity';
import { ImagesCron } from './images.cron';

Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Image,
      Account,
    ]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService, ImagesCron],
  exports: [ImagesService],
})
export class ImagesModule { }
