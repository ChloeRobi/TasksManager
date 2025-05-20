import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Login } from '../model/login';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const login: Login = {
        username,
        password
    }
    const user = await this.authService.validateUser(login);
    if (!user) throw new UnauthorizedException();
    return user;
  }

}