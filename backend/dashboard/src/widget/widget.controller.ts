import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Req,
} from '@nestjs/common';
import { WidgetService } from './widget.service';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('widget')
@UseGuards(JwtAuthGuard)
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @Post()
  create(@Body() createWidgetDto: CreateWidgetDto, @Request() req) {
    const user = req.user.id
    return this.widgetService.create(createWidgetDto, user);
  }

  @Get()
  findAll(@Request() req) {
    return this.widgetService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.widgetService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWidgetDto: UpdateWidgetDto,
    @Request() req,
  ) {
    return this.widgetService.update(id, updateWidgetDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.widgetService.remove(id, req.user.id);
  }
}
