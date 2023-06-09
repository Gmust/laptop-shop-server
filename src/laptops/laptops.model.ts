import { Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';

@Table
export class Laptop extends Model {
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @Column
  name: string;

  @Column
  vendor_code: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column
  in_stock: number;

  @Column({ defaultValue: false })
  bestseller: false;

  @Column({ defaultValue: false })
  new: false;

  @Column
  manufacturer: string;

  @Column
  description: string;

  @Column
  images: string;

  @HasMany(() => TechData)
  technical_data: TechData[];
}

@Table
export class TechData extends Model {
  @ForeignKey(() => Laptop)
  @Column
  id: number;

  @Column({ autoIncrement: true, primaryKey: true })
  techDataId: number;

  @Column({ allowNull: false })
  title: string;

  @Column({ allowNull: false })
  description: string;
}
