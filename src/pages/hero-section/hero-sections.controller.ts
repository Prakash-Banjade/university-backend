import { Body, Controller, Delete, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HeroSectionsService } from './hero-sections.service';
import { HeroSectionDto, HeroSectionUpdateQueryDto } from './dto/hero-section.dto';

@ApiTags('Hero Sections')
@Controller('hero-sections')
export class HeroSectionsController {
  constructor(
    private readonly heroSectionsService: HeroSectionsService,
  ) { }

  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update hero section of a page', description: 'If id is provided updates the existing one, otherwise creates a new one' })
  @ApiNotFoundResponse({ description: 'Page not found' })
  async update(@Query() queryDto: HeroSectionUpdateQueryDto, @Body() dto: HeroSectionDto) {
    return this.heroSectionsService.update(queryDto.page, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete hero section of a page' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.heroSectionsService.delete(id);
  }

}
