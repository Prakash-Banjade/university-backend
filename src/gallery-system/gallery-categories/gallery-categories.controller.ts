import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { GalleryCategoriesService } from './gallery-categories.service';
import { CreateGalleryCategoryDto } from './dto/create-gallery-category.dto';
import { UpdateGalleryCategoryDto } from './dto/update-gallery-category.dto';
import { ApiBearerAuth, ApiConflictResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/setPublicRoute.decorator';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptor';

@ApiTags('Gallery categories')
@Controller('gallery-categories')
export class GalleryCategoriesController {
  constructor(private readonly galleryCategoriesService: GalleryCategoriesService) { }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create gallery category' })
  @ApiConflictResponse({ description: 'Gallery category with same name already exists' })
  create(@Body() dto: CreateGalleryCategoryDto) {
    return this.galleryCategoriesService.create(dto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all gallery categories' })
  findAll() {
    return this.galleryCategoriesService.findAll();
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update gallery category' })
  @ApiNotFoundResponse({ description: 'Gallery category not found' })
  @ApiConflictResponse({ description: 'Gallery category with same name already exists' })
  @ApiParam({ name: 'id', description: 'Gallery category ID' })
  @UseInterceptors(TransactionInterceptor)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateGalleryCategoryDto) {
    return this.galleryCategoriesService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove gallery category' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.galleryCategoriesService.remove(id);
  }
}
