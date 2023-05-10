import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from 'src/utils/bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
