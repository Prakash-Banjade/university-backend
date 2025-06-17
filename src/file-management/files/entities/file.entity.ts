import { BaseEntity } from "src/common/entities/base.entity";
import { JobApplication } from "src/jobs-system/job-applications/entities/job-application.entity";
import { Column, Entity, Index, OneToOne } from "typeorm";

@Entity()
export class File extends BaseEntity {
    @Index({ unique: true })
    @Column({ type: 'varchar' })
    url!: string

    @Column({ type: 'varchar' })
    mimeType!: string

    @Column({ type: 'varchar' })
    format!: string

    @Column({ type: 'int' })
    size!: number

    @Column({ type: 'varchar' })
    originalName!: string

    @Column({ type: 'varchar', default: '' })
    name!: string

    /**
    |--------------------------------------------------
    | RELATIONS
    |--------------------------------------------------
    */

    @OneToOne(() => JobApplication, (jobApplication) => jobApplication.resume, { onDelete: 'CASCADE', nullable: true })
    jobApplication: JobApplication | null;
}
