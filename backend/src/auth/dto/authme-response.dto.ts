import { BaseResponse } from '@/dtos/response.dto';
import { ApiProperty } from '@nestjs/swagger';

class AuthMeData {
  @ApiProperty({
    description: 'User id',
    required: true,
    type: String,
    example: '60f4f4c8a9d5c21e0c3f4b3a',
  })
  _id: string;

  @ApiProperty({
    description: 'Username',
    required: true,
    type: String,
    example: 'john_doe',
  })
  username: string;

  @ApiProperty({
    description: 'Full name',
    required: true,
    type: String,
    example: 'John Doe',
  })
  fullname: string;

  @ApiProperty({
    description: 'Email',
    required: false,
    type: String,
    example: 'john@doe.com',
  })
  email?: string;

  @ApiProperty({
    description: 'Avatar',
    required: true,
    type: String,
    example: 'https://i.pravatar.cc/300',
  })
  avatar: string;

  @ApiProperty({
    description: 'Bio',
    required: false,
    type: String,
    example: 'Hello World!',
  })
  bio?: string;

  @ApiProperty({
    description: 'Address',
    required: false,
    type: String,
    example: 'Earth',
  })
  address?: string;

  @ApiProperty({
    description: 'Github',
    required: false,
    type: String,
    example: 'https://github.com/wildanzr',
  })
  github?: string;

  @ApiProperty({
    description: 'Website',
    required: false,
    type: String,
    example: 'https://wildanzr.my.id',
  })
  website?: string;

  @ApiProperty({
    description: 'Providers',
    required: false,
    type: [String],
    example: ['LOCAL', 'GOOGLE'],
  })
  provider?: string[];

  @ApiProperty({
    description: 'Points',
    required: true,
    type: Number,
    example: 0,
  })
  points: number;

  @ApiProperty({
    description: 'Roles',
    required: true,
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
  points: number;
  roles: string[];
  avatar: string;
  email?: string;
  bio?: string;
  address?: string;
  github?: string;
  website?: string;
  provider?: string[];
}
