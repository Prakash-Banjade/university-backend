import { BaseEntity } from "src/common/entities/base.entity";
import { Image } from "src/file-management/images/entities/image.entity";
import { Column, Entity, Index, OneToMany } from "typeorm";

@Entity()
export class GalleryCategory extends BaseEntity {
    @Index({ unique: true })
    @Column({ type: 'varchar' })
    name: string;

    @OneToMany(() => Image, image => image.galleryCategory, { cascade: true })
    images: Image[]
}
