import { BaseResponse } from '@/dtos/response.dto';
import { ApiProperty } from '@nestjs/swagger';

class LoginData {}

export class RegisterResponseDto extends BaseResponse {
  @ApiProperty({
    description: 'Data of response',
    type: LoginData,
  })
  data: LoginData;
}

export class RegisterResponse {}
