import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Op } from 'sequelize';

class Laptops {
  @ApiProperty({ example: 1 })
  id: string;

  @ApiProperty({ example: faker.lorem.sentence(2) })
  name: string;

  @ApiProperty({ example: faker.internet.password() })
  vendor_code: string;

  @ApiProperty({ example: faker.random.numeric(5) })
  price: number;

  @ApiProperty({ example: 1 })
  in_stock: number;

  @ApiProperty({ example: faker.datatype.boolean() })
  bestseller: boolean;

  @ApiProperty({ example: faker.datatype.boolean() })
  new: boolean;

  @ApiProperty({ example: faker.lorem.sentence(2) })
  manufacturer: string;

  @ApiProperty({ example: faker.lorem.sentence(10) })
  description: string;

  @ApiProperty({ example: faker.image.technics() })
  images: string;

  @ApiProperty({ example: faker.date.recent() })
  createdAt: string;

  @ApiProperty({ example: faker.date.recent() })
  updatedAt: string;
}

export class PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: string;

  @ApiProperty({ example: [Laptops] })
  rows: Laptops[];
}

export class Bestsellers extends Laptops {
  @ApiProperty({ example: true })
  bestseller: boolean;
}

export class GetBestsellersResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: string;

  @ApiProperty({ example: [Bestsellers] })
  rows: Bestsellers[];
}

export class NewLaptops extends Laptops {
  @ApiProperty({ example: true })
  new: boolean;
}

export class GetNewResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: string;

  @ApiProperty({ example: [NewLaptops] })
  rows: NewLaptops[];
}

export class SearchResponse extends PaginateAndFilterResponse {
}

export class SearchRequest extends PaginateAndFilterResponse {
  @ApiProperty({ example: 'a' })
  search: string;
}

export class GetByNameResponse extends Laptops {
}

export class GetByNameRequest extends PaginateAndFilterResponse {
  @ApiProperty({ example: 'Iure possimus.' })
  name: string;
}

export class FindOneByIdResponse extends Laptops {
}

export interface ILaptopQuery {
  limit: string;
  offset: string;
  laptops: string | undefined;
  priceFrom: string | undefined;
  priceTo: string | undefined;
}

export interface ILaptopFilterQuery {
  price: {
    [Op.between]: number[]
  };
  laptops: string | undefined;
}
