import { BaseEntity } from "src/common/entities/base.entity";
import { Image } from "src/file-management/images/entities/image.entity";
import { CTA } from "src/pages/blocks";
import { Page } from "src/pages/entities/page.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from "typeorm";


@Entity()
export class HeroSection extends BaseEntity {
    @Column({ type: 'varchar', default: '' })
    title: string;

    @Column({ type: 'text', default: '' })
    subtitle: string;

    @OneToOne(() => Image, (image) => image.heroSection_image, { cascade: true, nullable: true })
    @JoinColumn()
    image: Image | null;

    @Column({ type: 'jsonb', default: [] })
    cta: CTA[];

    @Index()
    @ManyToOne(() => Page, (page) => page.heroSections, { onDelete: 'CASCADE' })
    page: Page;
}
