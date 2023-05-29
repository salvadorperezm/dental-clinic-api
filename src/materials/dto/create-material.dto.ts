import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMaterialDto {
  @IsNotEmpty()
  @IsString()
  materialName: string;

  @IsOptional()
  @IsString()
  materialDescription: string;

  @IsNotEmpty()
  @IsNumber()
  materialQuantity: number;

  @IsNotEmpty()
  @IsNumber()
  materialCost: number;

  @IsNotEmpty()
  @IsString()
  materialUnitOfMeasure: string;

  @IsNotEmpty()
  @IsString()
  materialExpiryDate: string;

  @IsNotEmpty()
  @IsNumber()
  supplierId: number;
}
