import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenInfoModule } from './modules/token-info/token-info.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenInfo } from './modules/token-info/entities/token-info.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [TokenInfo],
      synchronize: true,
    }),
    TokenInfoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
