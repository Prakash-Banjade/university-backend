import { BaseEntity } from "src/common/entities/base.entity";
import { EFaqType } from "src/common/types/global.type";
import { Column, Entity } from "typeorm";

@Entity()
export class Faq extends BaseEntity {
    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'enum', enum: EFaqType })
    category: EFaqType
}