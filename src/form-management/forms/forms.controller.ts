import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { ApiBearerAuth, ApiConflictResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/setPublicRoute.decorator';
import { QueryDto } from 'src/common/dto/query.dto';

@ApiTags('Forms')
@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) { }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new form' })
  @ApiConflictResponse({ description: 'Slug generated for this title already exists. Please choose different title.' })
  create(@Body() createFormDto: CreateFormDto) {
    return this.formsService.create(createFormDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all forms' })
  findAll(@Query() queryDto: QueryDto) {
    return this.formsService.findAll(queryDto);
  }

  @Get(':slug')
  @Public()
  @ApiOperation({ summary: 'Get form by slug' })
  @ApiNotFoundResponse({ description: 'Form with this slug doesn\'t exist.' })
  @ApiParam({ name: 'slug', type: 'string', description: 'Slug of the form' })
  findOne(@Param('slug') slug: string) {
    return this.formsService.findOne(slug);
  }

  @Patch(':slug')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update form by slug' })
  @ApiNotFoundResponse({ description: 'Form with this slug doesn\'t exist.' })
  @ApiConflictResponse({ description: 'Slug generated for this title already exists. Please choose different title.' })
  @ApiParam({ name: 'slug', type: 'string', description: 'Slug of the form' })
  update(@Param('slug') slug: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formsService.update(slug, updateFormDto);
  }

  @Delete(':slug')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete form by slug' })
  remove(@Param('slug') slug: string) {
    return this.formsService.remove(slug);
  }
}
