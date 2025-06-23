export type FieldValidationProp = {
    minLength?: number
    maxLength?: number
    pattern?: string
}

export enum FormFieldType {
    Text = 'text',
    Email = 'email',
    File = 'file',
    Tel = 'tel',
    Select = 'select',
    Textarea = 'textarea',
    Number = 'number',
    Relation = 'relation'
}

export enum FormFieldDataSourceEntity {
    Job = 'job',
    Course = 'course'
}

export type FormFieldOption = {
    value: string
    label: string
}

export type FormFieldDataSourceProp = {
    entity: FormFieldDataSourceEntity,
    multiple?: boolean
    filter?: string  // optional filter, eg. only show active jobs (WHERE status = 'active')
}

export type FormFieldDef = {
    type: FormFieldType
    name: string
    label: string
    placeholder?: string
    required: boolean
    options?: FormFieldOption[] // used for select field
    multiple?: boolean // used for select field
    accept?: string // used for file field
    dataSource?: FormFieldDataSourceProp // used for relation field
    validation?: FieldValidationProp
    order: number
}
