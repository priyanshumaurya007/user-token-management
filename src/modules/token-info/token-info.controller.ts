import { Controller, Get, Headers, Req, UnauthorizedException } from '@nestjs/common';
import { TokenInfoService } from './token-info.service';

@Controller('token-info')
export class TokenInfoController {
  constructor(private readonly tokenInfoService: TokenInfoService) {}

  @Get('user-plan')
  async getUserPlan(@Req() req: Request, @Headers('access_key') accessKey: string) {
    if (!accessKey) {
      throw new UnauthorizedException('Access key not provided');
    }

    try {
      const response = await this.tokenInfoService.fetchUserPlan(req, accessKey);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
