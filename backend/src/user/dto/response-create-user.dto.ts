import { BaseResponse } from '@/dtos/response.dto';
import { ApiProperty } from '@nestjs/swagger';

class Data {
  @ApiProperty({
    description: 'Email of user',
    format: 'email',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'Password of user',
    type: String,
  })
  password: string;

  @ApiProperty({
    description: 'Age of user',
    type: Number,
  })
  age: number;
}

export class ResponseCreateUser extends BaseResponse {
  @ApiProperty({
    description: 'Data of response',
    type: Data,
  })
  data: Data;
}
