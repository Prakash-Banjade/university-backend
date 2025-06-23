import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";

export class FormSubmissionQueryDto extends QueryDto {
    @ApiProperty({ type: 'string', format: 'uuid', description: 'Form ID' })
    @IsUUID()
    formId: string;
}