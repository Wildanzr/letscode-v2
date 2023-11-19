import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Email or username',
    format: 'email',
    examples: ['john@doe.com', 'johndoe'],
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Password',
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
