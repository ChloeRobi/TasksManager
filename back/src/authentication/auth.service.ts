import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Login } from './model/login';
import { JwtService } from '@nestjs/jwt';
import { ErrorMessage } from './model/errorMessage';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: Login) {
    const foundedUser: User | null = await this.userService.findByEmail(login.username);
    if (!foundedUser) {
      throw new UnauthorizedException(ErrorMessage.NO_USER_FOUND);
    } else if (!await bcrypt.compare(login.password, foundedUser.password)) {
      throw new UnauthorizedException(ErrorMessage.WRONG_PASSWORD);
    }
    const { password, ...user } = foundedUser;
    return this.jwtService.sign(user);
  }

}