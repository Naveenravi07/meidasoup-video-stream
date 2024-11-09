import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.gurad';
import type { CreateUserRequest } from 'src/users/dto/create-user-request';
import { createUserRequestSchema } from 'src/users/dto/create-user-request';
import { ZodValidationPipe } from 'comon/pipes/zodValidationPipe';
import { GResponse } from 'comon/classes/GResponse';
import { GithubAuthGuard } from './github-auth.gurad';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/local/login')
  async local_login() {}

  @Post('/local/signup')
  @UsePipes(new ZodValidationPipe(createUserRequestSchema))
  async local_signup(@Body() body: CreateUserRequest) {
    const newUser = await this.authService.signupLocal(body);
    return new GResponse({
      status: 201,
      message: 'New user created successfully',
      data: newUser,
    });
  }
  
  @UseGuards(GithubAuthGuard)
  @Get('/github/login')
  async github_login(){}

  @UseGuards(GithubAuthGuard)
  @Get('/github/cb')
  async github_cb(){}
}
