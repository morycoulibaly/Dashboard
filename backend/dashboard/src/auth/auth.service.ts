import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './types/auth-jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOnebyEmail(email);
    if (!user) throw new UnauthorizedException('User not found');
    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid user credentials');

    return { id: user.id };
  }

  login(userId: number) {
    const payload: AuthPayload = { sub: userId };
    return this.jwtService.sign(payload);
  }
}
