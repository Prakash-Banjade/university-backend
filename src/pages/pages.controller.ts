import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PagesService } from './pages.service';
import { CreatePageDto, UpdatePageDto } from './dto/page.dto';
import { PageQueryDto } from './dto/page-query.dto';
import { Public } from 'src/common/decorators/setPublicRoute.decorator';

@ApiTags('Pages')
@Controller('pages')
export class PagesController {
    constructor(
        private readonly pagesService: PagesService
    ) { }

    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new page' })
    @ApiConflictResponse({ description: 'Page with same name already exists' })
    create(@Body() dto: CreatePageDto) {
        return this.pagesService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all pages' })
    findAll() {
        return this.pagesService.findAll();
    }

    @Get(':slug')
    @Public()
    @ApiOperation({ summary: 'Get page by slug' })
    findOne(@Param('slug') slug: string, @Query() queryDto: PageQueryDto) {
        return this.pagesService.findOne(slug, queryDto);
    }

    @Patch(':slug')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update page' })
    @ApiNotFoundResponse({ description: 'Page not found' })
    update(@Param('slug') slug: string, @Body() dto: UpdatePageDto) {
        return this.pagesService.update(slug, dto);
    }

    @Delete(':slug')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete page' })
    @ApiNotFoundResponse({ description: 'Page not found' })
    remove(@Param('slug') slug: string) {
        return this.pagesService.remove(slug);
    }
}
