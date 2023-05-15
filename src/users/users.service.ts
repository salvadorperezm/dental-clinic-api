import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hashPassword } from '../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    const foundUser = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    return foundUser;
  }

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new HttpException(
        'Las contraseñas no coinciden.',
        HttpStatus.FORBIDDEN,
      );
    }

    const foundUser = await this.findOneByEmail(createUserDto.email);

    if (foundUser) {
      throw new HttpException(
        'El correo ya se encuentra registrado.',
        HttpStatus.FORBIDDEN,
      );
    }

    const newUser = {
      ...createUserDto,
      password: hashPassword(createUserDto.password),
    };
    return this.usersRepository.save(newUser);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const foundUser = await this.usersRepository.findOne(id);

    if (!foundUser) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return foundUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const foundUser = await this.findOne(id);

    const updatedUser = {
      firstName: updateUserDto.firstName || foundUser.email,
      lastName: updateUserDto.lastName || foundUser.lastName,
      email: updateUserDto.email || foundUser.email,
      role: updateUserDto.role || foundUser.role,
    };

    return await this.usersRepository.update(
      {
        id: foundUser.id,
      },
      updatedUser,
    );
  }

  async remove(id: number) {
    const foundUser = await this.findOne(id);

    return this.usersRepository.softDelete(foundUser.id);
  }
}
