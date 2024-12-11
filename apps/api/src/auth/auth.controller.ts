import {
    Body,
    Controller,
    Get,
    Post,
    Redirect,
    UseGuards,
    UsePipes,
    Response,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.gurad';
import type { CreateLocalUserRequest } from 'src/users/dto/create-user-request';
import { createLocalUserRequestSchema } from 'src/users/dto/create-user-request';
import { ZodValidationPipe } from 'comon/pipes/zodValidationPipe';
import { GResponse } from 'comon/classes/GResponse';
import { GithubAuthGuard } from './github-auth.gurad';
import { UsersService } from 'src/users/users.service';
import { CurrentUser } from 'comon/decorators/current-user-decorator';
import type { SessionUser } from 'src/users/dto/session-user';
import type { Response as ExpressResponse } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('/local/login')
    async local_login(@Response() res: ExpressResponse, @CurrentUser() user: SessionUser) {
        res.cookie('x-auth-cookie', user?.id);
        res.status(200).send('Success');
    }

    @Post('/local/signup')
    @UsePipes(new ZodValidationPipe(createLocalUserRequestSchema))
    async local_signup(@Body() body: CreateLocalUserRequest) {
        const newUser = await this.authService.signupLocal(body);
        return new GResponse({
            status: 201,
            message: 'New user created successfully',
            data: newUser,
        });
    }

    @Get('/github/login')
    @UseGuards(GithubAuthGuard)
    async github_login() { }

    @Get('/github/cb')
    @UseGuards(GithubAuthGuard)
    @Redirect('http://localhost:5000')
    async github_cb(@Response() res: ExpressResponse, @CurrentUser() user: SessionUser) {
        res.cookie('x-auth-cookie', user?.id);
    }

    @Get('/me')
    async get_user_data(@CurrentUser() user: SessionUser, @Response() res: ExpressResponse) {
        if (user == null) {
            res.clearCookie('x-auth-cookie');
            return res.status(400).json({
                data: undefined,
                message: 'User fetch failed',
                status: 400,
            });
        }
        let data = await this.userService.getUser(user.id);
        return res.status(200).json({
            data: data,
            message: 'User fetched successfully',
            status: 200,
        });
    }
}
