import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsObject, IsString, IsUUID } from "class-validator";

export class CreateFormSubmissionDto {
    @ApiProperty({ type: 'string', description: 'Form Slug' })
    @IsString()
    @IsNotEmpty()
    formSlug: string;

    @ApiProperty({ type: 'object', description: 'Form data', additionalProperties: true })
    @IsDefined()
    @IsObject()
    data: Record<string, any>;
}
