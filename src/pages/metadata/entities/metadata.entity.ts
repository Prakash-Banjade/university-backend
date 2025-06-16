import { BaseEntity } from "src/common/entities/base.entity";
import { Page } from "src/pages/entities/page.entity";
import { Column, Entity, OneToOne } from "typeorm";

@Entity()
export class Metadata extends BaseEntity {
    @Column({ type: 'varchar', default: '' })
    title: string;

    @Column({ type: 'text', default: '' })
    description: string;

    @Column({ type: 'text', array: true, default: [] })
    keywords: string[];

    @OneToOne(() => Page, (page) => page.metadata, { onDelete: 'CASCADE', nullable: false })
    page: Page;
}
