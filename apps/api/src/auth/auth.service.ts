import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from "bcrypt"
import { CreateUserRequest } from 'src/users/dto/create-user-request';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) { }

    async validateUser(email: string, pwd: string) {
        let user = await this.userService.getUserByEmail(email);
        let isValid = await bcrypt.compare(pwd, user.pwd);
        if (!isValid) {
            throw new UnauthorizedException("Invalid Password")
        }
        return user
    }

    async signupLocal(user: CreateUserRequest) {
        user.pwd = await bcrypt.hash(user.pwd, 10)
        let doc = await this.userService.createUser(user)
        return doc
    }
}
