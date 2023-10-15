import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Email',
    example: 'john@doe.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
