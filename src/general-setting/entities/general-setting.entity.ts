import { BaseEntity } from "src/common/entities/base.entity";
import { Image } from "src/file-management/images/entities/image.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class GeneralSetting extends BaseEntity {
    @Column({ type: 'varchar', length: 255, default: '' })
    companyName: string;

    @OneToOne(() => Image, image => image.generalSetting_logo, { cascade: true, nullable: true })
    @JoinColumn()
    logo: Image | null;

    @Column({ type: 'text' })
    footerDescription: string;

    @Column({ type: 'text' })
    privacyPolicy: string

    @Column({ type: 'text' })
    termsAndConditions: string
}