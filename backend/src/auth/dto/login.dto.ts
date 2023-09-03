import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Email or username',
    format: 'email',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
