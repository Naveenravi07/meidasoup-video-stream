import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './../users/users.service';
import bcrypt from 'bcrypt';
import type {
  CreateGithubUserRequest,
  CreateLocalUserRequest,
} from 'src/users/dto/create-user-request';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateLocalUser(email: string, pwd: string) {
    const user = await this.userService.getUserByEmail(email);
    const isValid = bcrypt.compare(pwd, user.pwd ?? '');
    if (!isValid) {
      throw new UnauthorizedException('Invalid Password');
    }
    return { name: user.name, id: user.id };
  }

  async signupLocal(user: CreateLocalUserRequest) {
    user.provider = 'email';
    user.pwd = await bcrypt.hash(user.pwd, 10);
    const doc = await this.userService.createUser(user);
    return doc;
  }

  async validateGithubUser(profile: any) {
    const email: string | null = profile.emails?.[0]?.value || null;
    if (!email) {
      throw new UnauthorizedException(
        'GitHub account does not provide an email',
      );
    }
    try {
      const userExist = await this.userService.getUserByEmail(email);
      return { name: userExist.name, id: userExist.id };
    } catch (e) {
      if (e instanceof NotFoundException) {
        const name: string =
          profile.displayName ||
          profile.userName ||
          email.split('@')?.[0] ||
          'Github user';
        const pfpUrl: string | null = profile?.photos?.[0]?.value || null;
        const githubId: string = profile?.id;
        if (!githubId) {
          throw new UnauthorizedException(
            'GitHub account does not provide an id',
          );
        }
        const user: CreateGithubUserRequest = {
          name,
          pfpUrl,
          githubId,
          email,
          provider: 'github',
        };
        const data = await this.userService.createUser(user);
        return { name: data.name, id: data.id };
      }
      throw e;
    }
  }
}
