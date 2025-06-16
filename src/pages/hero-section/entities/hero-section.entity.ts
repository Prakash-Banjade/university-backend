import { BaseEntity } from "src/common/entities/base.entity";
import { Image } from "src/file-management/images/entities/image.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

export enum ECtaVariant {
    Primary = 'primary',
    Secondary = 'secondary',
    Outline = 'outline'
}

export interface HeroSectionCta {
    text: string,
    link: string,
    variant: ECtaVariant
    icon?: string
}

@Entity()
export class HeroSection extends BaseEntity {
    @Column({ type: 'varchar', default: '' })
    title: string;

    @Column({ type: 'text' })
    subtitle: string;

    @OneToOne(() => Image, (image) => image.heroSection_image, { cascade: true, nullable: true })
    @JoinColumn()
    image: Image | null;

    @Column({ type: 'jsonb' })
    cta: HeroSectionCta[];
}
