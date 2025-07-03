import { BaseEntity } from "src/common/entities/base.entity";
import { EAlignment, EAlignmentExcludeCenter, Link } from "src/common/types/global.type";
import { Image } from "src/file-management/images/entities/image.entity";
import { Page } from "src/pages/entities/page.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from "typeorm";

export enum EHeroLayoutTypes {
    Jumbotron = "jumbotron",
    Split_Hero = "splitHero"
}

export type THeroLayout = {
    type: EHeroLayoutTypes.Jumbotron,
    alignment: EAlignment
} | {
    type: EHeroLayoutTypes.Split_Hero,
    imagePosition: EAlignmentExcludeCenter,
}

@Entity()
export class HeroSection extends BaseEntity {
    @Column({ type: 'varchar', default: '' })
    headline: string;

    @Column({ type: 'text', default: '' })
    subheadline: string;

    @OneToOne(() => Image, (image) => image.heroSection_image, { cascade: true, nullable: true })
    @JoinColumn()
    image: Image | null;

    @Column({ type: 'jsonb', default: {} })
    layout: THeroLayout;

    @Column({ type: 'jsonb', default: [] })
    cta: Link[];

    @Index()
    @ManyToOne(() => Page, (page) => page.heroSections, { onDelete: 'CASCADE' })
    page: Page;
}
