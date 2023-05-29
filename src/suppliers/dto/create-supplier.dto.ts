import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  @IsString()
  supplierName: string;

  @IsNotEmpty()
  @IsString()
  supplierAddress: string;

  @IsNotEmpty()
  @IsEmail()
  supplierEmail: string;
}
