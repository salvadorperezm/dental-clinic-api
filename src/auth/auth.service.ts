import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from 'src/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const foundUser = await this.usersService.findOneByEmail(signInDto.email);

    if (!foundUser) {
      throw new HttpException(
        'El correo no pertenece a ningun usuario.',
        HttpStatus.NOT_FOUND,
      );
    }

    if (comparePasswords(signInDto.password, foundUser.password) === false) {
      throw new HttpException('Contraseña incorrecta.', HttpStatus.FORBIDDEN);
    }

    const payload = { email: foundUser.email, sub: foundUser.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
