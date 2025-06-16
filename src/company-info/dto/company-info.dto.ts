import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEmail, IsOptional, IsPhoneNumber, IsString, IsUrl, Length } from "class-validator";
import { Transform } from "class-transformer";

export class CompanyInfoDto {
    @ApiPropertyOptional({ type: 'string' })
    @IsString()
    @Length(3, 20, { message: 'City must be between 3 and 50 characters' })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    city?: string;

    @ApiPropertyOptional({ type: 'string' })
    @IsString()
    @IsOptional()
    @Length(3, 50, { message: 'Address must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    address?: string;

    @ApiPropertyOptional({ type: 'string' })
    @IsString({ each: true })
    @IsPhoneNumber('NP', { message: JSON.stringify({ message: 'Each phone number must be valid', field: 'phone' }), each: true })
    phone?: string[] = [];

    @ApiPropertyOptional({ type: 'string' })
    @IsString()
    @IsOptional()
    @Length(3, 50, { message: 'Map link must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    mapLink?: string;

    @ApiPropertyOptional({ type: 'string' })
    @IsEmail({}, { each: true })
    @IsOptional()
    @IsArray()
    email?: string[] = [];

    @ApiPropertyOptional({ type: 'string' })
    @IsString()
    @IsOptional()
    @IsPhoneNumber('NP', { message: JSON.stringify({ message: 'Phone number is not valid', field: 'emergencyPhone' }) })
    emergencyPhone?: string;

    @ApiPropertyOptional({ type: 'string' })
    @IsString()
    @IsOptional()
    @Length(3, 50, { message: 'Working hours must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    workingHours?: string;

    @ApiPropertyOptional({ type: 'string', isArray: true })
    @IsArray()
    @IsUrl({}, { each: true })
    @IsOptional()
    socialProfiles: string[] = [];
}