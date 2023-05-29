import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';
import { Repository } from 'typeorm';
import { SuppliersService } from 'src/suppliers/suppliers.service';

@Injectable()
export class MaterialsService {
  constructor(
    private suppliersService: SuppliersService,
    @InjectRepository(Material)
    private materialsRepository: Repository<Material>,
  ) {}

  async create(createMaterialDto: CreateMaterialDto) {
    const foundSupplier = await this.suppliersService.findOne(
      createMaterialDto.supplierId,
    );

    const newMaterial = {
      supplier: foundSupplier,
      ...createMaterialDto,
    };

    return this.materialsRepository.save(newMaterial);
  }

  findAll() {
    return this.materialsRepository.find({
      order: {
        id: 'ASC',
      },
      relations: ['supplier'],
    });
  }

  async findOne(id: number) {
    const foundMaterial = await this.materialsRepository.findOne(id);

    if (!foundMaterial) {
      throw new HttpException('Material no encontrando.', HttpStatus.NOT_FOUND);
    }

    return foundMaterial;
  }

  async update(id: number, updateMaterialDto: UpdateMaterialDto) {
    const foundMaterial = await this.findOne(id);

    const updatedMaterial = {
      materialName:
        updateMaterialDto.materialName || foundMaterial.materialName,
      materialDescription:
        updateMaterialDto.materialDescription ||
        foundMaterial.materialDescription,
      materialQuantity:
        updateMaterialDto.materialQuantity || foundMaterial.materialQuantity,
      materialCost:
        updateMaterialDto.materialCost || foundMaterial.materialCost,
      materialUnitOfMeasure:
        updateMaterialDto.materialUnitOfMeasure ||
        foundMaterial.materialUnitOfMeasure,
      materialExpiryDate:
        updateMaterialDto.materialExpiryDate ||
        foundMaterial.materialExpiryDate,
    };

    return await this.materialsRepository.update(
      {
        id: foundMaterial.id,
      },
      updatedMaterial,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} material`;
  }
}
