import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>,
  ) {}

  create(createSupplierDto: CreateSupplierDto) {
    return this.suppliersRepository.save(createSupplierDto);
  }

  async findAll() {
    return await this.suppliersRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const foundSupplier = await this.suppliersRepository.findOne(id);

    if (!foundSupplier) {
      throw new HttpException(
        'Distribuidor no encontrado.',
        HttpStatus.NOT_FOUND,
      );
    }

    return foundSupplier;
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const foundSupplier = await this.findOne(id);

    const updatedSupplier = {
      supplierName:
        updateSupplierDto.supplierName || foundSupplier.supplierName,
      supplierEmail:
        updateSupplierDto.supplierEmail || foundSupplier.supplierEmail,
      supplierAddress:
        updateSupplierDto.supplierAddress || foundSupplier.supplierAddress,
    };

    return await this.suppliersRepository.update(
      {
        id: foundSupplier.id,
      },
      updatedSupplier,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
