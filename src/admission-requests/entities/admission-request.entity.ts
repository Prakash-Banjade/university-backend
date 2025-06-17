import { BaseEntity } from "src/common/entities/base.entity";
import { Course } from "src/courses/entities/course.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class AdmissionRequest extends BaseEntity {
    @Column({ type: 'varchar' })
    firsName: string;

    @Column({ type: 'varchar' })
    lastName: string;

    @Column({ type: 'varchar', default: '' })
    email: string;

    @Column({ type: 'varchar' })
    phone: string;

    @ManyToOne(() => Course, (course) => course.admissionRequests, { onDelete: 'CASCADE', nullable: false })
    course: Course
}