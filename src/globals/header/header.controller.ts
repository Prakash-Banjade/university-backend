import { Controller, Get, Body, Patch } from '@nestjs/common';
import { HeaderService } from './header.service';
import { UpdateHeaderDto } from './dto/update-header.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/setPublicRoute.decorator';

@ApiTags('Header')
@Controller('header')
export class HeaderController {
  constructor(private readonly headerService: HeaderService) { }

  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update header' })
  update(@Body() updateHeaderDto: UpdateHeaderDto) {
    return this.headerService.update(updateHeaderDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get header' })
  get() {
    return this.headerService.get();
  }
}
