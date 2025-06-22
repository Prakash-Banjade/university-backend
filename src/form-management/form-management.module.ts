import { Module } from '@nestjs/common';
import { FormsModule } from './forms/forms.module';
import { FormSubmissionsModule } from './form-submissions/form-submissions.module';

@Module({
    imports: [FormsModule, FormSubmissionsModule]
})
export class FormManagementModule { }
