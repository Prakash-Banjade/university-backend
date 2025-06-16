import { BaseEntity } from "src/common/entities/base.entity";
import { Image } from "src/file-management/images/entities/image.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Feature extends BaseEntity {
    @Column({ type: "varchar" })
    title: string;

    @Column({ type: "text" })
    description: string;

    @OneToOne(() => Image, (image) => image.feature_image, { cascade: true, nullable: true })
    @JoinColumn()
    image: Image;
}
