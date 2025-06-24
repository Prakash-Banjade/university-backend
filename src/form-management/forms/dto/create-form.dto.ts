import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDefined, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Length, Min, ValidateIf, ValidateNested } from "class-validator";
import { FieldValidationProp, FormFieldDataSourceEntity, FormFieldDataSourceProp, FormFieldDef, FormFieldOption, FormFieldType } from "../form-fields";
import { isRegExp } from "util/types";
import { BadRequestException } from "@nestjs/common";

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
    @ValidateIf(o => {
        if (o.pattern && !isRegExp(o.pattern)) {
            throw new BadRequestException(`Invalid validation pattern`);
        }

        return true;
    })
    pattern?: string;
}

class FormFieldOptionDto implements FormFieldOption {
    @ApiProperty({ type: 'string', description: 'Value of the option' })
    @IsString({ message: 'Value must be a string' })
    @IsNotEmpty({ message: 'Value is required' })
    @Transform(({ value }) => value?.trim())
    value: string;

    @ApiProperty({ type: 'string', description: 'Label of the option' })
    @IsString({ message: 'Label must be a string' })
    @IsNotEmpty({ message: 'Label is required' })
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
    @IsString({ message: 'Name must be a string' })
    @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim()?.replace(/\s+/g, '_').replace(/[^\w-]+/g, '')) // Replace spaces with underscores, remove special characters
    name: string;

    @ApiProperty({ type: 'string', description: 'Label of the field' })
    @IsString({ message: 'Label must be a string' })
    @Length(3, 50, { message: 'Label must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    label: string;

    @ApiPropertyOptional({ type: 'string', description: 'Placeholder of the field', default: "" })
    @IsString({ message: 'Placeholder must be a string' })
    @Length(3, 50, { message: 'Placeholder must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    @IsOptional()
    placeholder?: string = "";

    @ApiPropertyOptional({ type: 'boolean', description: 'Is the field required', default: false })
    @IsBoolean()
    @IsOptional()
    required: boolean = false;

    @ApiPropertyOptional({ type: 'string', description: 'Accept attribute of the field' })
    @IsString({ message: "Accept attribute must be a string" })
    @IsNotEmpty({ message: "Accept attribute is required for file fields" })
    @ValidateIf((o: FormFieldDefDto) => o.type === FormFieldType.File)
    accept?: string;

    @ApiProperty({ type: 'number', description: 'Order of the field' })
    @IsInt({ message: "Order must be an integer" })
    @Min(0, { message: "Order must be greater than or equal to 0" })
    order: number;

    @ApiPropertyOptional({ type: FieldValidationPropDto, description: 'Validation properties of the field' })
    @ValidateNested()
    @Type(() => FieldValidationPropDto)
    @IsOptional()
    validation?: FieldValidationPropDto;

    @ApiPropertyOptional({ type: [FormFieldOptionDto], description: 'Options of the field' })
    @IsArray({ message: "Options must be an array" })
    @ValidateNested({ each: true })
    @Type(() => FormFieldOptionDto)
    @ArrayMinSize(1)
    @ValidateIf((o: FormFieldDefDto) => o.type === FormFieldType.Select)
    options?: FormFieldOptionDto[];

    @ApiPropertyOptional({ type: 'boolean', default: false })
    @IsBoolean()
    @ValidateIf((o: FormFieldDefDto) => o.type === FormFieldType.Select)
    multiple?: boolean = false;

    @ApiPropertyOptional({ type: FormFieldDataSourcePropDto, description: 'Data source properties of the field' })
    @ValidateNested()
    @Type(() => FormFieldDataSourcePropDto)
    @IsDefined({ message: "Data source properties are required for relation fields" })
    @ValidateIf((o: FormFieldDefDto) => o.type === FormFieldType.Relation)
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
