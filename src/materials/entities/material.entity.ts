import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('materials')
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

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
