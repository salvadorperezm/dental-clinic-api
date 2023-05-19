import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentsService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const foundUser = await this.usersService.findOne(
      createAppointmentDto.userId,
    );

    const foundDoctor = await this.usersService.findOne(
      createAppointmentDto.doctorId,
    );

    if (!foundUser || !foundDoctor) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }

    if (foundDoctor.role !== 'Personnel') {
      throw new HttpException(
        'El doctor no cuenta con los permisos.',
        HttpStatus.FORBIDDEN,
      );
    }

    const newAppointment = this.appointmentsRepository.create({
      ...createAppointmentDto,
      users: [foundUser, foundDoctor],
    });

    return this.appointmentsRepository.save(newAppointment);
  }

  findAll() {
    return `This action returns all appointments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
