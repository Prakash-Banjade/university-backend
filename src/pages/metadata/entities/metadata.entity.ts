import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Metadata extends BaseEntity {
    @Column({ type: 'varchar', default: '' })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'text', array: true })
    keywords: string[]
}
