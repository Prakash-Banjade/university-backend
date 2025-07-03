import { BaseEntity } from "src/common/entities/base.entity"
import { BeforeInsert, BeforeUpdate, Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { PageSection } from "../blocks.interface"
import { HeroSection } from "../hero-section/entities/hero-section.entity";
import { Metadata } from "../metadata/entities/metadata.entity";
import { generateSlug } from "src/utils/generateSlug";

@Entity()
export class Page extends BaseEntity {
    @Column({ type: 'varchar' })
    name: string;

    @Index({ unique: true })
    @Column({ type: 'varchar' })
    slug: string;

    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
        if (this.name) this.slug = generateSlug(this.name);
    }

    @OneToMany(() => HeroSection, heroSection => heroSection.page, { cascade: true })
    heroSections: HeroSection[];

    @OneToOne(() => Metadata, metadMetadata => metadMetadata.page, { cascade: true, nullable: false })
    @JoinColumn()
    metadata: Metadata;

    @Column({ type: 'jsonb', default: [] })
    sections: PageSection[];
}
