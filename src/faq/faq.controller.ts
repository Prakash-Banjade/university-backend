import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { FaqService } from "./faq.service";
import { Public } from "src/common/decorators/setPublicRoute.decorator";
import { CreateFaqDto } from "./dto/create-faq.dto";
import { QueryDto } from "src/common/dto/query.dto";
import { UpdateFaqDto } from "./dto/update-faq.dto";

@ApiTags('Faq')
@Controller('faqs')
export class FaqController {
    constructor(
        private readonly faqService: FaqService
    ) { }

    @ApiBearerAuth()
    @Post()
    async create(@Body() createFaqDto: CreateFaqDto) {
        return await this.faqService.create(createFaqDto);
    }

    @Public()
    @Get()
    async findAll(@Query() queryDto: QueryDto) {
        return await this.faqService.findAll(queryDto);
    }

    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.faqService.findOne(id);
    }

    @ApiBearerAuth()
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
        return await this.faqService.update(id, updateFaqDto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        return await this.faqService.remove(id);
    }
}