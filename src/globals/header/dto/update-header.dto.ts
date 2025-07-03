import { BadRequestException } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsEnum, IsOptional, IsString, isURL, Length, ValidateIf, ValidateNested } from 'class-validator';
import { ENavLinkType, NavLink } from 'src/globals/interfaces';

export class NavLinkDto implements NavLink {
  @ApiProperty({ type: 'string', description: 'Name of the navlink' })
  @IsString()
  @Length(3, 20, { message: 'Name must be between 3 and 20 characters' })
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiProperty({ type: 'string', description: 'URL of the navlink' })
  @IsString()
  @Length(3, 200, { message: 'URL must be between 3 and 200 characters' })
  @Transform(({ value }) => value?.trim())
  @ValidateIf((o: NavLinkDto) => {
    if (o.type === ENavLinkType.External && !isURL(o.url)) {
      throw new BadRequestException({ message: 'Invalid URL' });
    }

    return true;
  })
  url: string;

  @ApiProperty({ enum: ENavLinkType, description: 'Type of the navlink' })
  @IsEnum(ENavLinkType)
  type: ENavLinkType

  @ApiPropertyOptional({ type: 'string', description: 'Icon for the navlink' })
  @IsOptional()
  @IsString()
  @Length(3, 50, { message: 'Icon must be between 3 and 50 characters' })
  @Transform(({ value }) => value?.trim())
  icon?: string;

  @ApiPropertyOptional({ type: [NavLinkDto], isArray: true, description: 'Sublinks of the navlink' })
  @Type(() => NavLinkDto)
  @ValidateNested()
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10, { message: 'Sublinks must be less than 10' })
  subLinks: NavLinkDto[] = [];
}

export class UpdateHeaderDto {
  @ApiPropertyOptional({ type: [NavLinkDto], isArray: true, description: 'Sublinks of the navlink' })
  @Type(() => NavLinkDto)
  @ValidateNested()
  @IsArray()
  @ArrayMaxSize(20, { message: 'Nav links must be less than 20' })
  @IsOptional()
  navLinks?: NavLinkDto[] = [];
}
