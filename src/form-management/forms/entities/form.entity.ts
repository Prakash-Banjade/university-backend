import { BaseEntity } from "src/common/entities/base.entity"
import { BeforeInsert, BeforeUpdate, Column, Entity, Index } from "typeorm"
import { FormFieldDef } from "../form-fields"
import { generateSlug } from "src/utils/generateSlug"

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
}