
import { Module } from '@nestjs/common';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';

@Module({
  imports: [HeaderModule, FooterModule],
})
export class GlobalsModule { }
