import { InternalServerErrorException } from "@nestjs/common";
import { BaseEntity } from "src/common/entities/base.entity";
import { EAcademicDegree, EAcademicFaculty } from "src/common/types/global.type";
import { Image } from "src/file-management/images/entities/image.entity";
import { generateSlug } from "src/utils/generateSlug";
import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Course extends BaseEntity {
    @Index()
    @Column({ type: 'text' })
    name: string;

    @Index({ unique: true })
    @Column({ type: 'varchar' })
    slug: string;

    generateSlug() {
        if (!this.name || !this.degree || !this.faculty) throw new InternalServerErrorException('Name, degree and faculty are required to generate slug');
        this.slug = generateSlug(this.name) + '-' + this.degree + '-' + this.faculty;
    }

    @Column({ type: 'text' })
    summary: string;

    @Column({ type: 'text' })
    description: string;

    @OneToOne(() => Image, image => image.course_coverImage, { cascade: true, nullable: true })
    @JoinColumn()
    coverImage: Image | null;

    @Column({ type: 'int' })
    duration: number; // in years

    @Index()
    @Column({ type: 'enum', enum: EAcademicDegree })
    degree: EAcademicDegree;

    @Index()
    @Column({ type: 'enum', enum: EAcademicFaculty })
    faculty: EAcademicFaculty;

    @Column({ type: 'text' })
    eligibility: string;
}
