import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport-github"
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubStratergy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ) {
        super({
            clientID: configService.getOrThrow("GITHUB_CLIENT_ID"),
            clientSecret: configService.getOrThrow("GITHUB_CLIENT_SECRET"),
            callBackUrl: "http://localhost:3000/auth/github/cb"
        });
    }
    async validate(accessToken:string,refreshToken:string,profile:any,cb:any) {
        console.log(profile)
        return true
    }
}

