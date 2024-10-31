import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/create-user-request.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/all')
  async getAllUsers(){
    return this.usersService.getAllUsers();
  }

  @Post('/new')
  async createUser(@Body() body: CreateUserRequest){
    return this.usersService.createUser(body)
  }
}
