
import { Controller, Get, Post,Patch, Body,Param,Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post()
  async create(@Body() CreateUserDto: CreateUserDto): Promise<User> {
    return this.UsersService.create(CreateUserDto);
  }

  @Get()
  async findAll(@Query() filters: FindUserDto): Promise<User[]> {
    return this.UsersService.findAll(filters);
  }

  @Get('search')
  async search(@Query() filters: FindUserDto): Promise<User[]> {
    return this.UsersService.searchUsers(filters);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.UsersService.findById(id);
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return this.UsersService.login(loginDto);
  }
  
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.UsersService.update(id, updateUserDto);
  }
}
