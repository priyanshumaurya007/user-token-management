import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenInfoService } from '../token-info.service';
import { TokenInfoResponsePayload } from '../dto/response-payload/token-info.response.payload';

@Injectable()
export class TokenInfoMiddleware implements NestMiddleware {
  constructor(private readonly tokenInfoService: TokenInfoService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
        const accessKey: string = req.headers['access_key'] as string;
        const tokenInfo: TokenInfoResponsePayload = await this.tokenInfoService.fetchKeyDetails(accessKey);

        const currentTimestamp = new Date();
        const expirationDate = new Date(tokenInfo.expiration);

        if (expirationDate < currentTimestamp) {
        throw new HttpException('Access key has expired', HttpStatus.UNAUTHORIZED);
        }

        const lastMinuteEntries: number = await this.tokenInfoService.countLastMinuteEntries(accessKey);
        if (lastMinuteEntries >= tokenInfo?.rateLimit) {
        throw new HttpException('Rate limit exceeded', HttpStatus.TOO_MANY_REQUESTS);
        }

        req['tokenInfo'] = tokenInfo; 
        next();
    } catch (error) {
        next(error);
    }
  }
}
