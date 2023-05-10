import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class ShoppingCart extends Model {
  @Column
  userId: number;

  @Column
  laptopId: number;

  @Column
  name: string;

  @Column
  vendor_code: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column
  in_stock: number;

  @Column
  manufacturer: string;

  @Column
  image: string;

  @Column({ defaultValue: 0 })
  count: number;

  @Column({ defaultValue: 0 })
  totalPrice: number;
}
