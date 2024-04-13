import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenInfoModule } from './modules/token-info/token-info.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenInfo } from './modules/token-info/entities/token-info.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'token_info',
      entities: [TokenInfo],
      synchronize: true,
    }),
    TokenInfoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
