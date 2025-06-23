import { BaseEntity } from "src/common/entities/base.entity"
import { BeforeInsert, BeforeUpdate, Column, Entity, Index, OneToMany } from "typeorm"
import { FormFieldDef } from "../form-fields"
import { generateSlug } from "src/utils/generateSlug"
import { FormSubmission } from "src/form-management/form-submissions/entities/form-submission.entity"

@Entity()
export class Form extends BaseEntity {
    @Column({ type: 'varchar', unique: true })
    title: string

    @Index({ unique: true })
    @Column({ type: 'varchar' })
    slug: string

    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
        if (this.title) this.slug = generateSlug(this.title);
    }

    @Column({ type: 'jsonb' })
    fields: FormFieldDef[]

    @OneToMany(() => FormSubmission, submission => submission.form)
    submissions: FormSubmission[]
}