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
import { LaptopsModule } from 'src/laptops/laptops.module';
import { LaptopsService } from 'src/laptops/laptops.service';
import { ShoppingCart } from 'src/shopping-cart/shopping-cart.model';
import { ShoppingCartModule } from 'src/shopping-cart/shopping-cart.module';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import * as request from 'supertest';

const mockedUser = {
  username: 'billie',
  email: 'billie@gmail.com',
  password: 'pass123'
};

describe('Laptops controller', () => {
  let app: INestApplication;
  let laptopsService: LaptopsService;
  let usersService: UsersService;

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
        ShoppingCartModule,
        AuthModule,
        LaptopsModule
      ]
    }).compile();

    laptopsService = testModule.get<LaptopsService>(LaptopsService);
    usersService = testModule.get<UsersService>(UsersService);

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

  beforeEach(async () => {
    const cart = new ShoppingCart();
    const user = await usersService.findOne({ where: { username: mockedUser.username } });
    const laptop = await laptopsService.findOneById(1);

    cart.userId = user.id;
    cart.laptopId = laptop.id;
    cart.manufacturer = laptop.manufacturer;
    cart.price = laptop.price;
    cart.in_stock = laptop.in_stock;
    cart.image = JSON.parse(laptop.images)[0];
    cart.name = laptop.name;
    cart.totalPrice = laptop.price;
    cart.vendor_code = laptop.vendor_code;

    return cart.save();
  });

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
    await ShoppingCart.destroy({ where: { laptopId: 1 } });
  });

  it('should get item ', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const user = await usersService.findOne({
      where: { username: mockedUser.username }
    });

    const response = await request(app.getHttpServer())
      .get(`/shopping-cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          price: expect.any(Number),
          count: expect.any(Number),
          totalPrice: expect.any(Number),
          id: expect.any(Number),
          userId: expect.any(Number),
          laptopId: expect.any(Number),
          manufacturer: expect.any(String),
          in_stock: expect.any(Number),
          image: expect.any(String),
          name: expect.any(String),
          vendor_code: expect.any(String),
          updatedAt: expect.any(String),
          createdAt: expect.any(String)
        }
      ])
    );
  });

  it('should add to cart', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const user = await usersService.findOne({
      where: { username: mockedUser.username }
    });

    await request(app.getHttpServer())
      .post(`/shopping-cart/add`)
      .send({ username: mockedUser.username, laptopId: 1 })
      .set('Cookie', login.headers['set-cookie']);

    const response = await request(app.getHttpServer())
      .get(`/shopping-cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.find((el) => el.laptopId === 1)).toEqual(
      expect.objectContaining({
        price: expect.any(Number),
        count: expect.any(Number),
        totalPrice: expect.any(Number),
        id: expect.any(Number),
        userId: expect.any(Number),
        laptopId: expect.any(Number),
        manufacturer: expect.any(String),
        in_stock: expect.any(Number),
        image: expect.any(String),
        name: expect.any(String),
        vendor_code: expect.any(String),
        updatedAt: expect.any(String),
        createdAt: expect.any(String)
      })
    );
  });

  it('should count update', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .patch(`/shopping-cart/count/1`)
      .send({ count: 2 })
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual({ count: 2 });
  });

  it('should total price update', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const laptop = await laptopsService.findOneById(1);

    const response = await request(app.getHttpServer())
      .patch(`/shopping-cart/total-price/1`)
      .send({ total_price: laptop.price * 2 })
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual({ total_price: laptop.price * 2 });
  });

  it('should remove one', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const laptop = await laptopsService.findOneById(1);

    await request(app.getHttpServer()).delete(`/shopping-cart/one/1`).set('Cookie', login.headers['set-cookie']);

    const user = await usersService.findOne({
      where: { username: mockedUser.username }
    });

    const response = await request(app.getHttpServer())
      .get(`/shopping-cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.find((el) => el.laptopId === 1)).toBeUndefined();
  });

  it('should remove all', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const laptop = await laptopsService.findOneById(1);

    const user = await usersService.findOne({
      where: { username: mockedUser.username }
    });

    await request(app.getHttpServer())
      .delete(`/shopping-cart/delete-all/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    const response = await request(app.getHttpServer())
      .get(`/shopping-cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.length === 0);
  });
});
