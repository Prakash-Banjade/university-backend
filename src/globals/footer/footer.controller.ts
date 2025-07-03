import { Controller, Get, Body, Patch } from '@nestjs/common';
import { FooterService } from './footer.service';
import { UpdateFooterDto } from './dto/update-footer.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/setPublicRoute.decorator';

@ApiTags('Footer')
@Controller('footer')
export class FooterController {
  constructor(private readonly footerService: FooterService) { }

  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update footer' })
  update(@Body() updateFooterDto: UpdateFooterDto) {
    return this.footerService.update(updateFooterDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get footer' })
  get() {
    return this.footerService.get();
  }
}
