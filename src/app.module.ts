import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfigAsync } from './config/postgres.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { MaterialsModule } from './materials/materials.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(pgConfigAsync),
    UsersModule,
    AuthModule,
    AppointmentsModule,
    MaterialsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
