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
import { LoginDto } from './dto/login.dto';
import { LoginResponse, LoginResponseDto } from './dto/login-response.dto';
import { ResponseMessage } from '@/decorators/response.decorator';

@Controller('auth')
@ApiTags('Auth')
@ApiBadRequestResponse({ type: BadResponse })
@ApiNotFoundResponse({ type: NotFoundResponse })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: RegisterResponseDto })
  @ResponseMessage(
    'Successfully registered, please check your email to activate your account',
  )
  async register(@Body() payload: RegisterDto) {
    return await this.authService.register(payload);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: LoginResponseDto })
  @ResponseMessage('Successfully logged in')
  async login(@Body() payload: LoginDto): Promise<LoginResponse> {
    return await this.authService.login(payload);
  }
}
