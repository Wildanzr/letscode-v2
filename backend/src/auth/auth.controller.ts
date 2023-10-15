import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Request,
  Post,
  UseGuards,
  Param,
} from '@nestjs/common';
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
import { NoDataResponse } from '@/dtos/nodata-response.dto';
import { AuthMeResponse, AuthMeResponseDto } from './dto/authme-response.dto';
import { JwtAuthGuard } from '@/guard/jwt-auth.guard';
import { Request as ExRequest } from 'express';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import {
  CheckTokenResponse,
  CheckTokenResponseDto,
} from './dto/check-token-response.dto';

@Controller('auth')
@ApiTags('Auth')
@ApiBadRequestResponse({ type: BadResponse })
@ApiNotFoundResponse({ type: NotFoundResponse })
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: RegisterResponseDto })
  @ResponseMessage(
    'Successfully registered, please check your email to activate your account',
  )
  async register(@Body() payload: RegisterDto): Promise<NoDataResponse> {
    return await this.authService.register(payload);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: LoginResponseDto })
  @ResponseMessage('Successfully logged in')
  async login(@Body() payload: LoginDto): Promise<LoginResponse> {
    return await this.authService.login(payload);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: NoDataResponse })
  @ResponseMessage('Successfully sent reset password instruction to your email')
  async forgotPassword(
    @Body() payload: ForgotPasswordDto,
  ): Promise<NoDataResponse> {
    return await this.authService.forgotPassword(payload);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthMeResponseDto })
  @ResponseMessage('Successfully get user data')
  async authMe(@Request() req: ExRequest): Promise<AuthMeResponse> {
    const { _id } = req.user as { _id: string };
    return this.authService.me(_id);
  }

  @Get('verify/:token')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: NoDataResponse })
  @ResponseMessage('Successfully verified')
  async verifyAccount(@Param('token') token: string): Promise<NoDataResponse> {
    return await this.authService.activateAccount(token);
  }

  @Get('check-token/:token')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: CheckTokenResponseDto })
  @ResponseMessage('Successfully check token')
  async checkToken(@Param('token') token: string): Promise<CheckTokenResponse> {
    return await this.authService.checkToken(token);
  }
}
