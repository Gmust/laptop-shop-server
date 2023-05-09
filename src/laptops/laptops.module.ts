import { Module } from '@nestjs/common';
import { LaptopsService } from './laptops.service';
import { LaptopsController } from './laptops.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Laptop, TechData } from './laptops.model';

@Module({
  imports: [SequelizeModule.forFeature([Laptop, TechData])],
  providers: [LaptopsService],
  controllers: [LaptopsController],
  exports: [LaptopsService]
})
export class LaptopsModule {
}
