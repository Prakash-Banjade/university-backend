import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class ContactQuery extends BaseEntity {
    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', default: '' })
    email: string;

    @Column({ type: 'varchar' })
    phone: string;

    @Column({ type: 'text' })
    message: string;
}