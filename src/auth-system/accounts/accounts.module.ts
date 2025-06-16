import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountsCronJob } from './accounts.cron';
import { LoginDevice } from './entities/login-device.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Account,
      LoginDevice
    ]),
    AuthModule,
  ],
  providers: [AccountsService, AccountsCronJob],
  exports: [AccountsService],
})
export class AccountsModule { }
