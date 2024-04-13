import axios, { AxiosError, AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { TokenInfo } from './entities/token-info.entity';
import { TokenInfoResponsePayload } from './dto/response-payload/token-info.response.payload';

@Injectable()
export class TokenInfoService {
  constructor(
    @InjectRepository(TokenInfo)
    private readonly tokenInfoRepository: Repository<TokenInfo>,
  ) {}

  async fetchKeyDetails(accessKey: string): Promise<TokenInfoResponsePayload> {
    try {
      const response = await axios.get(`http://localhost:3000/keys/${accessKey}`);
      const data = response?.data;

      const tokenInfo = new TokenInfoResponsePayload();

      tokenInfo.id = data?.id;
      tokenInfo.expiration = data?.expiration;
      tokenInfo.key = data?.key;
      tokenInfo.rateLimit = data?.rateLimit;
      tokenInfo.userId = data?. userId;

      return tokenInfo;
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        if (axiosError.response) {
          throw new Error(`Request failed with status code ${axiosError.response.status}`);
        } else if (axiosError.request) {
          throw new Error('No response received from server');
        } else {
          throw new Error('Error setting up request');
        }
      } else {
        throw new Error('Unknown error occurred');
      }
    }
  }

  async saveTokenInfo(tokenInfo: TokenInfo): Promise<TokenInfo> {
    try {
      return await this.tokenInfoRepository.save(tokenInfo);
    } catch (error) {
      throw new Error('Failed to save token info');
    }
  }

  async fetchUserPlan(req: Request, accessKey: string): Promise<TokenInfo> {
    try {
      const data: TokenInfoResponsePayload = req['tokenInfo'];

      const tokenInfo = new TokenInfo();
      tokenInfo.key = data?.key;
      tokenInfo.currentTimestamp = new Date();
      tokenInfo.routePath = "Fetch Key details";
      tokenInfo.successful = true;

      return await this.saveTokenInfo(tokenInfo);
    } catch (error) {
      throw error;
    }
  }

  async countLastMinuteEntries(accessKey: string): Promise<number> {
    try {
      const oneMinuteAgo = new Date();
      oneMinuteAgo.setMinutes(oneMinuteAgo.getMinutes() - 1);

      const count = await this.tokenInfoRepository.count({
        where: {
          key: accessKey,
          currentTimestamp: Between(oneMinuteAgo, new Date()),
        },
      });

      return count;
    } catch (error) {
      throw new Error('Failed to count last minute entries');
    }
  }
}
