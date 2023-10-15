import { BaseResponse } from '@/dtos/response.dto';
import { ApiProperty } from '@nestjs/swagger';

class AuthMeData {
  @ApiProperty({
    description: 'User id',
    type: String,
    example: '60f4f4c8a9d5c21e0c3f4b3a',
  })
  _id: string;

  @ApiProperty({
    description: 'Username',
    type: String,
    example: 'john_doe',
  })
  username: string;

  @ApiProperty({
    description: 'Full name',
    type: String,
    example: 'John Doe',
  })
  fullname: string;

  @ApiProperty({
    description: 'Email',
    type: String,
    example: 'john@doe.com',
  })
  email: string;

  @ApiProperty({
    description: 'Roles',
    type: [String],
    example: ['STUDENT'],
  })
  roles: string[];
}

export class AuthMeResponseDto extends BaseResponse {
  @ApiProperty({
    description: 'Data of response',
    type: AuthMeData,
  })
  data: AuthMeData;
}

export class AuthMeResponse {
  _id: string;
  username: string;
  fullname: string;
  email?: string;
  roles: string[];
}
