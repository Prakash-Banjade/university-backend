import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/setPublicRoute.decorator';

@ApiTags('features')
@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) { }

  @Post()
  @ApiBearerAuth()
  create(@Body() dto: CreateFeatureDto) {
    return this.featuresService.create(dto);
  }

  @Public()
  @Get()
  findAll() {
    return this.featuresService.findAll();
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateFeatureDto) {
    return this.featuresService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.featuresService.remove(id);
  }
}
