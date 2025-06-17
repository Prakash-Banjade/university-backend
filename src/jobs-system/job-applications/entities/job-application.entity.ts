import { BaseEntity } from "src/common/entities/base.entity";
import { File } from "src/file-management/files/entities/file.entity";
import { Job } from "src/jobs-system/jobs/entities/job.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class JobApplication extends BaseEntity {
    @Column({ type: 'varchar' })
    fullname: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    phone: string;

    @Column({ type: 'varchar' })
    qualification: string;

    @Column({ type: 'varchar' })
    currentOrganization: string;

    @Column({ type: 'varchar' })
    currentDesignation: string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    currentSalary: number;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    expectedSalary: number;

    @Column({ type: 'int' })
    noticePeriod: number;

    @ManyToOne(() => Job, (job) => job.applications, { onDelete: 'CASCADE', nullable: false })
    job: Job

    @OneToOne(() => File, (file) => file.jobApplication, { nullable: false })
    @JoinColumn()
    resume: File;
}
