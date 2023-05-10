import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Laptop, TechData } from './laptops.model';
import { ILaptopQuery } from './types';

@Injectable()
export class LaptopsService {
  constructor(
    @InjectModel(Laptop) private laptopModel: typeof Laptop,
    @InjectModel(TechData) private techDataModel: typeof TechData
  ) {
  }

  async paginateAndFilter(query: ILaptopQuery): Promise<{ count: number; rows: Laptop[] }> {
    const limit = +query.limit;
    const offset = +query.offset * 20;

    return this.laptopModel.findAndCountAll({
      limit,
      offset
    });
  }

  async bestsellers(): Promise<{ count: number; rows: Laptop[] }> {
    return this.laptopModel.findAndCountAll({ where: { bestseller: true } });
  }

  async new(): Promise<{ count: number; rows: Laptop[] }> {
    return this.laptopModel.findAndCountAll({ where: { new: true } });
  }

  async findOneById(id: number | string): Promise<Laptop> {
    return this.laptopModel.findOne({ where: { id }, include: this.techDataModel });
  }

  async findOneByName(name: string): Promise<Laptop> {
    return this.laptopModel.findOne({ where: { name } });
  }

  async searchByString(str: string): Promise<{ count: number; rows: Laptop[] }> {
    return this.laptopModel.findAndCountAll({
      limit: 20,
      where: { name: { [Op.like]: `%${str}%` } }
    });
  }
}

