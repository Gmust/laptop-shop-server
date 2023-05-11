import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import * as session from 'express-session';
import * as passport from 'passport';
import { AuthModule } from 'src/auth/auth.module';
import { dbConfig } from 'src/config/configuration';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import { User } from 'src/users/users.model';
import { LaptopsModule } from 'src/laptops/laptops.module';
import * as request from 'supertest';

const mockedUser = {
  username: 'billie',
  email: 'billie@gmail.com',
  password: 'pass123'
};

describe('Laptops controller', () => {
  let app: INestApplication;

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
        AuthModule,
        LaptopsModule
      ]
    }).compile();

    app = testModule.createNestApplication();
    app.use(
      session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    await app.init();
  });

  beforeEach(async () => {
    const user = new User();

    const hashedPassword = await bcrypt.hash(mockedUser.password, 10);
    user.username = mockedUser.username;
    user.email = mockedUser.email;
    user.password = hashedPassword;

    return user.save();
  });

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
    await User.destroy({ where: { username: 'test' } });
  });

  it('should get laptop', async () => {
    const response = await request(app.getHttpServer()).get('/laptops/find/1');

    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        price: expect.any(Number),
        manufacturer: expect.any(String),
        vendor_code: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        images: expect.any(String),
        in_stock: expect.any(Number),
        bestseller: expect.any(Boolean),
        new: expect.any(Boolean),
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      })
    );
  });

  it('should bestsellers', async () => {
    const response = await request(app.getHttpServer()).get('/laptops/bestsellers');

    expect(response.body.rows).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          price: expect.any(Number),
          manufacturer: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          in_stock: expect.any(Number),
          bestseller: true,
          new: expect.any(Boolean),
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        }
      ])
    );
  });

  it('should new', async () => {
    const response = await request(app.getHttpServer()).get('/laptops/new');

    expect(response.body.rows).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          price: expect.any(Number),
          manufacturer: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          in_stock: expect.any(Number),
          bestseller: expect.any(Boolean),
          new: true,
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        }
      ])
    );
  });

  it('should search by string', async () => {
    const body = { search: 'lu' };
    const response = await request(app.getHttpServer()).post('/laptops/search').send(body);

    expect(response.body.rows.length).toBeLessThanOrEqual(20);

    response.body.rows.forEach((el) => expect(el.name.toLowerCase()).toContain(body.search));

    expect(response.body.rows).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          price: expect.any(Number),
          manufacturer: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          in_stock: expect.any(Number),
          bestseller: expect.any(Boolean),
          new: expect.any(Boolean),
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        }
      ])
    );
  });

  it('should get by name', async () => {
    const body = { name: 'test name' };
    const response = await request(app.getHttpServer()).post('/laptops/name').send(body);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        price: expect.any(Number),
        manufacturer: expect.any(String),
        vendor_code: expect.any(String),
        name: body.name,
        description: expect.any(String),
        images: expect.any(String),
        in_stock: expect.any(Number),
        bestseller: expect.any(Boolean),
        new: expect.any(Boolean),
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      })
    );
  });
});
