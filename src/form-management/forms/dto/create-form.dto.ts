import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDefined, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Length, Min, ValidateNested } from "class-validator";
import { FieldValidationProp, FormFieldDataSourceEntity, FormFieldDataSourceProp, FormFieldDef, FormFieldOption, FormFieldType } from "../form-fields";

class FieldValidationPropDto implements FieldValidationProp {
    @ApiPropertyOptional({ type: 'number', description: 'Minimum length of the field' })
    @IsInt()
    @Min(0)
    @IsOptional()
    minLength?: number;

    @ApiPropertyOptional({ type: 'number', description: 'Maximum length of the field' })
    @IsInt()
    @Min(0)
    @IsOptional()
    maxLength?: number;

    @ApiPropertyOptional({ type: 'string', description: 'Regular expression to validate the field' })
    @IsString()
    @IsOptional()
    pattern?: string;
}

class FormFieldOptionDto implements FormFieldOption {
    @ApiProperty({ type: 'string', description: 'Value of the option' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    value: string;

    @ApiProperty({ type: 'string', description: 'Label of the option' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    label: string;
}

class FormFieldDataSourcePropDto implements FormFieldDataSourceProp {
    @ApiProperty({ enum: FormFieldDataSourceEntity, description: 'Entity of the field' })
    @IsEnum(FormFieldDataSourceEntity)
    entity: FormFieldDataSourceEntity;

    @ApiPropertyOptional({ type: 'string', description: 'Filter of the field', example: "WHERE status = 'active'" })
    @IsString()
    @IsOptional()
    filter?: string;

    @ApiPropertyOptional({ type: 'boolean', description: 'Multiple selection of the field', default: false })
    @IsBoolean()
    @IsOptional()
    multiple?: boolean = false;
}

class FormFieldDefDto implements FormFieldDef {
    @ApiProperty({ enum: FormFieldType, description: 'Type of the field' })
    @IsEnum(FormFieldType)
    type: FormFieldType;

    @ApiProperty({ type: 'string', description: 'Name of the field' })
    @IsString()
    @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    name: string;

    @ApiProperty({ type: 'string', description: 'Label of the field' })
    @IsString()
    @Length(3, 50, { message: 'Label must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    label: string;

    @ApiPropertyOptional({ type: 'string', description: 'Placeholder of the field', default: "" })
    @IsString()
    @Length(3, 50, { message: 'Placeholder must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    @IsOptional()
    placeholder?: string = "";

    @ApiPropertyOptional({ type: 'boolean', description: 'Is the field required', default: false })
    @IsBoolean()
    @IsOptional()
    required: boolean = false;

    @ApiProperty({ type: 'number', description: 'Order of the field' })
    @IsInt()
    @Min(0)
    order: number;

    @ApiPropertyOptional({ type: FieldValidationPropDto, description: 'Validation properties of the field' })
    @ValidateNested()
    @Type(() => FieldValidationPropDto)
    @IsOptional()
    validation?: FieldValidationPropDto;

    @ApiPropertyOptional({ type: [FormFieldOptionDto], description: 'Options of the field' })
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => FormFieldOptionDto)
    options?: FormFieldOptionDto[];

    @ApiPropertyOptional({ type: FormFieldDataSourcePropDto, description: 'Data source properties of the field' })
    @ValidateNested()
    @Type(() => FormFieldDataSourcePropDto)
    @IsOptional()
    dataSource?: FormFieldDataSourcePropDto;
}

export class CreateFormDto {
    @ApiProperty({ description: 'Title of the form' })
    @IsString()
    @Length(3, 50, { message: 'Title must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    title: string;

    @ApiProperty({ description: 'Fields of the form', type: [FormFieldDefDto] })
    @IsArray()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => FormFieldDefDto)
    @ArrayMinSize(1, { message: 'At least one field is required' })
    @ArrayMaxSize(50, { message: 'Maximum 50 fields allowed' })
    fields: FormFieldDefDto[];
}
