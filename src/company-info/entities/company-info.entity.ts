import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class CompanyInfo extends BaseEntity {
    @Column({ type: 'varchar', default: '' })
    city: string;

    @Column({ type: 'varchar', default: '' })
    address: string;

    @Column({ type: 'text', array: true })
    phone: string[];

    @Column({ type: 'varchar', default: '' })
    emergencyPhone: string;

    @Column({ type: 'varchar', default: '' })
    workingHours: string;

    @Column({ type: 'varchar', default: '' })
    mapLink: string;

    @Column({ type: 'text', array: true })
    email: string[];

    @Column({ type: 'text', array: true })
    socialProfiles: string[];
}