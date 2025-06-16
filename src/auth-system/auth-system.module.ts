import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';
import { EncryptionModule } from './encryption/encryption.module';

@Module({
    imports: [
        UsersModule,
        AccountsModule,
        AuthModule,
        JwtModule,
        EncryptionModule,
    ]
})
export class AuthSystemModule { }
