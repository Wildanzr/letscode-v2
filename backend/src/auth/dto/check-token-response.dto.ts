import { BaseResponse } from '@/dtos/response.dto';
import { ApiProperty } from '@nestjs/swagger';

class CheckTokenData {
  @ApiProperty({
    description: 'Valid or not',
    required: true,
    type: Boolean,
    example: true,
  })
  valid: boolean;
}

export class CheckTokenResponseDto extends BaseResponse {
  @ApiProperty({
    description: 'Response data',
    type: CheckTokenData,
  })
  data: CheckTokenData;
}

export class CheckTokenResponse {
  valid: boolean;
}
