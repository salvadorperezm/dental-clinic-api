import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(signInDto: SignInDto): Promise<User | null> {
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

    const { password, ...result } = foundUser;

    return foundUser;
  }
}
