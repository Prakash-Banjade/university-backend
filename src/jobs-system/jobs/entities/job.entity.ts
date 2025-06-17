import { BaseEntity } from "src/common/entities/base.entity";
import { JobApplication } from "src/jobs-system/job-applications/entities/job-application.entity";
import { Column, Entity, OneToMany } from "typeorm";

export enum EJobType {
    FullTime = 'full-time',
    PartTime = 'part-time',
    Internship = 'internship',
    Contract = 'contract'
}

export enum EJobStatus {
    Open = 'open',
    Closed = 'closed'
}

@Entity()
export class Job extends BaseEntity {
    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text' })
    department: string;

    @Column({ type: 'enum', enum: EJobType })
    type: EJobType;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'enum', enum: EJobStatus, default: EJobStatus.Open })
    status: EJobStatus;

    @OneToMany(() => JobApplication, jobApplication => jobApplication.job)
    applications: JobApplication[]
}
