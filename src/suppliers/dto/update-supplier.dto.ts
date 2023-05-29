import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateSupplierDto {
  @IsOptional()
  @IsString()
  supplierName: string;

  @IsOptional()
  @IsString()
  supplierAddress: string;

  @IsOptional()
  @IsEmail()
  supplierEmail: string;
}
