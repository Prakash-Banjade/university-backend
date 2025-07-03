import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { NavLinkDto } from 'src/globals/header/dto/update-header.dto';

export class UpdateFooterDto {
  @ApiPropertyOptional({ type: [NavLinkDto], isArray: true, description: 'Sublinks of the navlink' })
  @Type(() => NavLinkDto)
  @ValidateNested()
  @IsArray()
  @ArrayMaxSize(20, { message: 'Nav links must be less than 20' })
  @IsOptional()
  navLinks?: NavLinkDto[] = [];

  @ApiProperty({ type: 'string' })
  @IsString()
  footerDescription: string;
}
