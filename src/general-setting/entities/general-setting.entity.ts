import { BaseEntity } from "src/common/entities/base.entity";
import { Image } from "src/file-management/images/entities/image.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { NavLink } from "../interfaces";

@Entity()
export class GeneralSetting extends BaseEntity {
    @Column({ type: 'varchar', length: 255, default: '' })
    companyName: string;

    @OneToOne(() => Image, image => image.generalSetting_logoPrimary, { cascade: true, nullable: true })
    @JoinColumn()
    primaryLogo: Image | null;

    @OneToOne(() => Image, image => image.generalSetting_logoSecondary, { cascade: true, nullable: true })
    @JoinColumn()
    secondaryLogo: Image | null;

    @Column({ type: 'text' })
    footerDescription: string;

    @Column({ type: 'jsonb', default: [] })
    navLinks: NavLink[]

    @Column({ type: 'text' })
    privacyPolicy: string

    @Column({ type: 'text' })
    termsAndConditions: string
}