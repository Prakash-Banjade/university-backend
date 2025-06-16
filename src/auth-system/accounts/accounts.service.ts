import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { DataSource } from 'typeorm';
import { Account } from './entities/account.entity';
import { BaseRepository } from 'src/common/repository/base-repository';
import { FastifyRequest } from 'fastify';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class AccountsService extends BaseRepository {
  constructor(
    dataSource: DataSource, @Inject(REQUEST) req: FastifyRequest,
  ) { super(dataSource, req) }

  async update(id: string, dto: UpdateAccountDto) {
    const account = await this.getRepository(Account).findOne({
      where: { id },
      select: { id: true, firstName: true, lastName: true, verifiedAt: true }
    });

    if (!account) throw new NotFoundException('No associated account found');

    Object.assign(account, dto)

    account.setLowerCasedFullName();

    await this.getRepository(Account).save(account);
  }
}
