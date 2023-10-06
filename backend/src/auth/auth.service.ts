import { User } from '@/schemas/user.schema';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { comparePassword, generateHashPassword } from '@/utils/common.util';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './dto/login-response.dto';
import { RegisterResponse } from './dto/register-response.dto';
import { MailService } from '@/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async register(payload: RegisterDto): Promise<RegisterResponse> {
    const { email, username, password } = payload;
    try {
      const check = await this.checkEmailandUsername(email, username);
      if (check) {
        throw new BadRequestException({
          status_code: HttpStatus.BAD_REQUEST,
          message:
            'Email or username already registered, please login instead!',
          error: 'Bad Request',
        });
      }

      const hashed = await generateHashPassword(password);
      payload.password = hashed;

      await this.userModel.create(payload);
      await this.mailService.sendActivationAccount(email);

      return;
    } catch (error) {
      throw error;
    }
  }

  async login(payload: LoginDto): Promise<LoginResponse> {
    const { username, password } = payload;
    try {
      const user = await this.userModel.findOne({
        $or: [{ username }, { email: username }],
      });
      if (!user) {
        throw new UnauthorizedException({
          status_code: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
          error: 'Unauthorized',
        });
      }

      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException({
          status_code: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
          error: 'Unauthorized',
        });
      }

      const payload = {
        id: user._id,
        username: user.username,
        roles: user.roles,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw error;
    }
  }

  async checkEmailandUsername(
    email: string,
    username: string,
  ): Promise<boolean> {
    try {
      const user = await this.userModel.findOne({
        $or: [{ email }, { username }],
      });
      if (user) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}
