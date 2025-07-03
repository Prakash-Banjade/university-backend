import { BaseEntity } from 'src/common/entities/base.entity';
import { Link } from 'src/common/types/global.type';
import { Column, Entity } from 'typeorm';

@Entity()
export class Footer extends BaseEntity {
  @Column({ type: 'jsonb', nullable: true })
  navLinks: Link[];

  @Column({ type: 'text', nullable: true })
  footerDescription: string;
}
