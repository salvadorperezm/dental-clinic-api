import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsString()
  scheduledDate: string;

  @IsOptional()
  @IsBoolean()
  isConfirmed: boolean;

  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;
}
