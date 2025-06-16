import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BlogsQueryDto } from './dto/blogs-query.dto';
import { Public } from 'src/common/decorators/setPublicRoute.decorator';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) { }

  @ApiBearerAuth()
  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @Public()
  @Get()
  findAll(@Query() queryDto: BlogsQueryDto) {
    return this.blogsService.findAll(queryDto);
  }

  @Public()
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.blogsService.findOne(slug);
  }

  @ApiBearerAuth()
  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(slug, updateBlogDto);
  }

  @ApiBearerAuth()
  @Delete(':slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('slug') slug: string) {
    return this.blogsService.remove(slug);
  }
}
