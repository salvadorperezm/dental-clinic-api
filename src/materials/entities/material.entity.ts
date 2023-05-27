import { Supplier } from 'src/suppliers/entities/supplier.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('materials')
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.materials)
  supplier: Supplier;

  @Column()
  materialName: string;

  @Column()
  materialDescription: string;

  @Column()
  materialQuantity: number;

  @Column()
  materialUnitOfMeasure: string;

  @Column()
  materialCost: number;

  @Column()
  materialExpiryDate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
