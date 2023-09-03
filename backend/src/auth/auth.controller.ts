import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BadResponse } from '@/dtos/bad.dto';
import { NotFoundResponse } from '@/dtos/notfound.dto';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@Controller('auth')
@ApiTags('Auth')
@ApiBadRequestResponse({ type: BadResponse })
@ApiNotFoundResponse({ type: NotFoundResponse })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: RegisterResponseDto })
  async register(@Body() payload: RegisterDto): Promise<RegisterResponseDto> {
    return await this.authService.register(payload);
  }
}
