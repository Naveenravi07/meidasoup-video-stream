import { Body, Controller, Get, HttpStatus, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/create-user-request.dto';
import { GResponse } from '../../comon/classes/GResponse';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  async getUser(@Query('id',ParseIntPipe) id:number ){
    let user = await this.usersService.getUser(id);
    return new GResponse({status:HttpStatus.OK,data:user,message:"user fetched successfully"})
  }

  @Get('/all')
  async getAllUsers(){
    let users = await this.usersService.getAllUsers();
    return new GResponse({status:HttpStatus.OK,data:users,message:"users fetched successfully"})
  }

  @Post('/new')
  async createUser(@Body() body: CreateUserRequest){
    let user = await this.usersService.createUser(body)
    return new GResponse({status:HttpStatus.CREATED,data:user,message:"user created successfully"})
  }
}
