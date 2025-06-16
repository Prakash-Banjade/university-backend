import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID, Length } from "class-validator";

export class GeneralSettingsDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @Length(3, 50, { message: 'Company name must be between 3 and 50 characters' })
    companyName?: string;

    @ApiPropertyOptional()
    @IsUUID()
    @IsOptional()
    logoId?: string

    @ApiPropertyOptional()
    @IsString()
    @Length(50, 200, { message: 'Footer description must be between 50 and 200 characters' })
    @IsOptional()
    footerDescription?: string;

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