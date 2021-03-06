import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  //
  // @Post()
  // create(@Body() CreateUserDto: CreateUserDto) {
  //   return this.userService.create(CreateUserDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  profile(@Request() req) {
    return req.user;
  }
}
