import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from './datasource/typeorm.module';
import { AuthSystemModule } from './auth-system/auth-system.module';
import { FileManagementModule } from './file-management/file-management.module';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { MailModule } from './mail/mail.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthGuard } from './common/guards/auth.guard';
import { createKeyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { EnvModule } from './env/env.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BlogsSystemModule } from './blogs-system/blogs-system.module';
import { FaqModule } from './faq/faq.module';
import { PagesModule } from './pages/pages.module';
import { CompanyInfoModule } from './company-info/company-info.module';
import { GeneralSettingModule } from './general-setting/general-setting.module';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [
    EnvModule,
    NestjsFormDataModule.config({
      storage: MemoryStoredFile,
      isGlobal: true,
      fileSystemStoragePath: 'public',
      autoDeleteFile: false,
      limits: {
        files: 10,
        fileSize: 5 * 1024 * 1024,
      },
      cleanupAfterSuccessHandle: false, // !important
    }),
    ThrottlerModule.forRoot([{
      ttl: 1000, // 5 req per second
      limit: 5,
    }]),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        return {
          stores: [createKeyv(configService.getOrThrow('REDIS_URL'))],
        };
      },
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule,
    AuthSystemModule,
    FileManagementModule,
    MailModule,
    BlogsSystemModule,
    FaqModule,
    PagesModule,
    CompanyInfoModule,
    GeneralSettingModule,
    FeaturesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // global rate limiting, but can be overriden in route level
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard, // global auth guard
    // },
  ],
})
export class AppModule { }
