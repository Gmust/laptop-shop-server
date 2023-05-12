import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { dbConfig } from 'src/config/configuration';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import { LaptopsModule } from 'src/laptops/laptops.module';
import { LaptopsService } from 'src/laptops/laptops.service';

describe('Auth service', () => {
  let app: INestApplication;
  let laptopsService: LaptopsService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService
        }),
        ConfigModule.forRoot({
          load: [dbConfig]
        }),
        LaptopsModule
      ]
    }).compile();

    laptopsService = testModule.get<LaptopsService>(LaptopsService);
    app = testModule.createNestApplication();
  });

  it('should find laptop', async () => {
    const laptop = await laptopsService.findOneById(1);

    expect(laptop.dataValues).toEqual(
      expect.objectContaining({
        id: 1,
        name: expect.any(String),
        price: expect.any(Number),
        vendor_code: expect.any(String),
        in_stock: expect.any(Number),
        bestseller: expect.any(Boolean),
        new: expect.any(Boolean),
        manufacturer: expect.any(String),
        description: expect.any(String),
        images: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        technical_data: expect.anything()
      })
    );
  });

  it('should find laptop by name', async () => {
    const laptop = await laptopsService.findOneByName('Sed quod.');

    expect(laptop.dataValues).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: 'Sed quod.',
        price: expect.any(Number),
        vendor_code: expect.any(String),
        in_stock: expect.any(Number),
        bestseller: expect.any(Boolean),
        new: expect.any(Boolean),
        manufacturer: expect.any(String),
        description: expect.any(String),
        images: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      })
    );
  });

  it('should find new', async () => {
    const laptop = await laptopsService.new();

    laptop.rows.forEach((el) =>
      expect(el.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
          vendor_code: expect.any(String),
          in_stock: expect.any(Number),
          bestseller: expect.any(Boolean),
          new: true,
          manufacturer: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date)
        })
      )
    );
  });

  it('should find bestsellers', async () => {
    const laptop = await laptopsService.bestsellers();

    laptop.rows.forEach((el) =>
      expect(el.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
          vendor_code: expect.any(String),
          in_stock: expect.any(Number),
          bestseller: true,
          new: expect.any(Boolean),
          manufacturer: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date)
        })
      )
    );
  });

  it('should find bestsellers', async () => {
    const laptop = await laptopsService.searchByString('lu');

    expect(laptop.rows.length).toBeLessThanOrEqual(20);

    laptop.rows.forEach((el) => {
      expect(el.name.toLowerCase()).toContain('lu');
      expect(el.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
          vendor_code: expect.any(String),
          in_stock: expect.any(Number),
          bestseller: expect.any(Boolean),
          new: expect.any(Boolean),
          manufacturer: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date)
        })
      );
    });
  });
});

