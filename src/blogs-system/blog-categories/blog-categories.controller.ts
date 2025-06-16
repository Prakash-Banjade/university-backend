import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Public } from "src/common/decorators/setPublicRoute.decorator";
import { BlogCategoriesService } from "./blog-categories.service";
import { BlogCategoryDto } from "./dto/blog-category.dto";

@ApiTags('Blog Categories')
@Controller('blog-categories')
export class BlogCategoriesController {
    constructor(
        private readonly blogCategoriesService: BlogCategoriesService,
    ) { }

    @ApiBearerAuth()
    @Post()
    create(@Body() dto: BlogCategoryDto) {
        return this.blogCategoriesService.create(dto);
    }

    @Public()
    @Get()
    findAll() {
        return this.blogCategoriesService.findAll();
    }

    @Get('options')
    getOptions() {
        return this.blogCategoriesService.getOptions();
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.blogCategoriesService.findOne(id);
    }

    @ApiBearerAuth()
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: BlogCategoryDto) {
        return this.blogCategoriesService.update(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.blogCategoriesService.remove(id);
    }
}