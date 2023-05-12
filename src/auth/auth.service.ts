import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const foundUser = await this.usersService.findOneByEmail(email);

    if (!foundUser) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }

    if (comparePasswords(pass, foundUser.password) === false) {
      throw new HttpException('Contraseña incorrecta.', HttpStatus.FORBIDDEN);
    }

    const { password, ...result } = foundUser;

    return foundUser;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
