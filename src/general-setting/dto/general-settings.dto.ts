import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ArrayMaxSize, IsArray, IsEnum, IsOptional, IsString, isURL, IsUUID, Length, ValidateIf, ValidateNested } from "class-validator";
import { ENavLinkType, NavLink } from "../../globals/interfaces";
import { Transform, Type } from "class-transformer";
import { BadRequestException } from "@nestjs/common";


export class GeneralSettingsDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @Length(3, 50, { message: 'Company name must be between 3 and 50 characters' })
    companyName?: string;

    @ApiPropertyOptional()
    @IsUUID()
    @IsOptional()
    primaryLogoId?: string

    @ApiPropertyOptional()
    @IsUUID()
    @IsOptional()
    secondaryLogoId?: string

    @ApiPropertyOptional()
    @IsString()
    @Length(100, 10000, { message: 'Privacy policy must be between 100 and 10000 characters' })
    @IsOptional()
    privacyPolicy?: string

    @ApiPropertyOptional()
    @IsString()
    @Length(100, 10000, { message: 'Terms and condition must be between 100 and 10000 characters' })
    @IsOptional()
    termsAndConditions?: string
}