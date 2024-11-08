import { Body, Controller, Get, HttpStatus, ParseIntPipe, Post, Query, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { GResponse } from '../../comon/classes/GResponse';
import { createUserRequestSchema } from './dto/create-user-request';
import type { CreateUserRequest } from './dto/create-user-request';
import {ZodValidationPipe } from '../../comon/pipes/zodValidationPipe';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('')
    async getUser(@Query('id', ParseIntPipe) id: number) {
        let user = await this.usersService.getUser(id);
        return new GResponse({ status: HttpStatus.OK, data: user, message: "user fetched successfully" })
    }

    @Get('/all')
    async getAllUsers() {
        let users = await this.usersService.getAllUsers();
        return new GResponse({ status: HttpStatus.OK, data: users, message: "users fetched successfully" })
    }

    @Post('/new')
    @UsePipes(new ZodValidationPipe(createUserRequestSchema))
    async createUser(@Body() body: CreateUserRequest) {
        let user = await this.usersService.createUser(body)
        return new GResponse({ status: HttpStatus.CREATED, data: user, message: "user created successfully" })
    }
}
