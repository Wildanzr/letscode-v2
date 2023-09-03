import { BaseResponse } from '@/dtos/response.dto';
import { ApiProperty } from '@nestjs/swagger';

class Data {
  @ApiProperty({
    description: 'Access token',
    type: String,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  access_token: string;
}

export class LoginResponseDto extends BaseResponse {
  @ApiProperty({
    description: 'Data of response',
    type: Data,
  })
  data: Data;
}
