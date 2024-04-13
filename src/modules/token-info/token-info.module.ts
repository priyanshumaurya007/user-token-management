import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TokenInfoController } from './token-info.controller';
import { TokenInfoService } from './token-info.service';
import { TokenInfo } from './entities/token-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenInfoMiddleware } from './middleware/token-info.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([TokenInfo])],
  controllers: [TokenInfoController],
  providers: [TokenInfoService]
})
export class TokenInfoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenInfoMiddleware).forRoutes('*');
  }
}
