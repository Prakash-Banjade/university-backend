import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Account } from './auth-system/accounts/entities/account.entity';
import * as bcrypt from 'bcrypt';
import { PASSWORD_SALT_COUNT } from './common/CONSTANTS';
import { User } from './auth-system/users/entities/user.entity';
import { CompanyInfo } from './company-info/entities/company-info.entity';
import { GeneralSetting } from './general-setting/entities/general-setting.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly dataSource: DataSource
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async seed() {

    const account = this.dataSource.getRepository(Account).create({
      firstName: "University",
      lastName: "Admin",
      email: "admin@gmail.com",
      password: "admin@123",
      verifiedAt: new Date(),
      lowerCaseFullName: "university admin",
      prevPasswords: [bcrypt.hashSync("admin@123", PASSWORD_SALT_COUNT)],
      passwordUpdatedAt: new Date(),
      user: this.dataSource.getRepository(User).create({}),
    });

    await this.dataSource.getRepository(Account).save(account);

    await this.dataSource.getRepository(CompanyInfo).save({
      phone: [],
      email: [],
      socialProfiles: [],
    })

    await this.dataSource.getRepository(GeneralSetting).save({
      logo: null,
      siteDescription: '',
      footerDescription: '',
      privacyPolicy: '',
      termsAndConditions: '',
    })

    return { message: 'Database seeded' };
  }
}

function heroSectionSeed(title: string) {
  return {
    title,
    subtitle: '',
    cta: [],
    image: null,
  }
}

function metadataSeed(title: string) {
  return {
    title,
    description: "",
    keywords: [],
  }
}