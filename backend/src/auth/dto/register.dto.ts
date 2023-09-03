import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    type: String,
    description: 'Email of the user',
    required: true,
    format: 'email',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsLowercase()
  @MaxLength(50)
  email: string;

  @ApiProperty({
    type: String,
    description: 'Username of the user',
    required: true,
    example: 'miaww97',
  })
  @IsNotEmpty()
  @IsString()
  @IsLowercase()
  @MaxLength(20)
  @MinLength(1)
  @Matches(/^[a-z0-9]+$/, {
    message: 'username must be a-z and 0-9',
  })
  username: string;

  @ApiProperty({
    type: String,
    description: 'Fullname of the user',
    required: true,
    example: 'Graita Sukma Febriansyah',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  fullname: string;

  @ApiProperty({
    type: String,
    description: 'Password of the user',
    required: true,
    example: '12345678',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(40)
  password: string;

  @ApiProperty({
    type: String,
    description: 'Confirm password of the user',
    required: true,
    example: '12345678',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(40)
  confirm_password: string;
}
