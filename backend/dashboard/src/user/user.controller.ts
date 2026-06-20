import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpException,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const UpdateUser = await this.userService.update(id, updateUser);
    if (!UpdateUser) throw new HttpException('User not found', 404);
    return UpdateUser;
  }

  @Delete(':id')
  async remove(@Param('id') userId: string) {
    const isValid = mongoose.Types.ObjectId.isValid(userId);
    if (!isValid) throw new HttpException('User not found', 400);
    const deleteUser = await this.userService.remove(userId);
    if (!deleteUser) throw new HttpException('User not found', 404);
    return this.userService.findOne(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return this.userService.findOne(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);
    const findUser = await this.userService.findOne(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return this.userService.findOne(id);
  }
}
