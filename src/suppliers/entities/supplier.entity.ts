import { Material } from 'src/materials/entities/material.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Material, (material) => material.supplier)
  materials: Material[];

  @Column()
  supplierName: string;

  @Column()
  supplierAddress: string;

  @Column()
  supplierEmail: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
