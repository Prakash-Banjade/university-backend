import { Body, Controller, Patch, Query } from '@nestjs/common';
import { MetadataDto } from './dto/metadata.dto';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MetadataService } from './metadata.service';
import { HeroSectionUpdateQueryDto } from '../hero-section/dto/hero-section.dto';

@ApiTags('Metadata')
@Controller('metadata')
export class MetadataController {
  constructor(
    private readonly metadataService: MetadataService
  ) { }

  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update metadata of a page' })
  @ApiNotFoundResponse({ description: 'Metadata not found' })
  update(@Query() queryDto: HeroSectionUpdateQueryDto, @Body() dto: MetadataDto) {
    return this.metadataService.update(queryDto.page, dto);
  }

}
