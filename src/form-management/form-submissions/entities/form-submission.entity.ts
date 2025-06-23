import { BaseEntity } from "src/common/entities/base.entity"
import { Form } from "src/form-management/forms/entities/form.entity"
import { Column, Entity, ManyToOne } from "typeorm"

@Entity()
export class FormSubmission extends BaseEntity {
    @ManyToOne(() => Form, form => form.submissions, { onDelete: 'CASCADE' })
    form: Form

    @Column({ type: 'jsonb' })
    data: Record<string, any>   // keys map to fieldDefs.name
}
