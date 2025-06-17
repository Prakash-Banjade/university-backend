import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ContactQueriesService } from "./contact-queries.service";
import { Public } from "src/common/decorators/setPublicRoute.decorator";
import { ContactQueryDto } from "./dto/contact-query.dto";
import { QueryDto } from "src/common/dto/query.dto";

@ApiTags('Contact Queries')
@Controller('contact-queries')
export class ContactQueriesController {
  constructor(
    private readonly contactQueriesService: ContactQueriesService
  ) { }

  @Post()
  @Public()
  @ApiOperation({ summary: 'Submit a contact query' })
  async create(@Body() contactQueryDto: ContactQueryDto) {
    return await this.contactQueriesService.create(contactQueryDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all contact queries' })
  async findAll(@Query() queryDto: QueryDto) {
    return await this.contactQueriesService.findAll(queryDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a contact query by id' })
  async findOne(@Param('id') id: string) {
    return await this.contactQueriesService.findOne(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a contact query by id' })
  async remove(@Param('id') id: string) {
    return await this.contactQueriesService.remove(id);
  }
}