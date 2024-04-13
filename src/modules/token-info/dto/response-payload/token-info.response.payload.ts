import { ApiProperty } from '@nestjs/swagger';

export class TokenInfoResponsePayload {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  key: string;

  @ApiProperty()
  rateLimit: number;

  @ApiProperty()
  expiration: Date;
}
