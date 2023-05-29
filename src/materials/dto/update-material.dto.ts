import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMaterialDto {
  @IsOptional()
  @IsString()
  materialName: string;

  @IsOptional()
  @IsString()
  materialDescription: string;

  @IsOptional()
  @IsNumber()
  materialQuantity: number;

  @IsOptional()
  @IsNumber()
  materialCost: number;

  @IsOptional()
  @IsString()
  materialUnitOfMeasure: string;

  @IsOptional()
  @IsString()
  materialExpiryDate: string;

  @IsOptional()
  @IsNumber()
  supplierId: number;
}
