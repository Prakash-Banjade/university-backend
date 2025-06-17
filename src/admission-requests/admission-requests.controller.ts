import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdmissionRequestsService } from "./admission-requests.service";
import { Public } from "src/common/decorators/setPublicRoute.decorator";
import { AdmissionRequestDto } from "./dto/admission-request.dto";
import { QueryDto } from "src/common/dto/query.dto";
import { Throttle } from "@nestjs/throttler";

@ApiTags('Admission Requests')
@Controller('admission-requests')
export class AdmissionRequestsController {
  constructor(
    private readonly admissionRequestsService: AdmissionRequestsService
  ) { }

  @Post()
  @Public()
  @Throttle({ default: { limit: 1, ttl: 60000 } }) // 1 request per minute
  @ApiOperation({ summary: 'Submit a contact query' })
  async create(@Body() dto: AdmissionRequestDto) {
    return await this.admissionRequestsService.create(dto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all admission requests' })
  async findAll(@Query() queryDto: QueryDto) {
    return await this.admissionRequestsService.findAll(queryDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a contact query by id' })
  async findOne(@Param('id') id: string) {
    return await this.admissionRequestsService.findOne(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a contact query by id' })
  async remove(@Param('id') id: string) {
    return await this.admissionRequestsService.remove(id);
  }
}