import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from './config/sequelizeConfig.service';
import { dbConfig } from './config/configuration';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService
    }),
    ConfigModule.forRoot({
      load: [dbConfig]
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [UsersController],
  providers: []
})
export class AppModule {
}
