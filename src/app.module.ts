import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfigAsync } from './config/postgres.config';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRootAsync(pgConfigAsync)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
