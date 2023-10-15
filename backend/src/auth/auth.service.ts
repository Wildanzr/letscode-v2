import { User, UserDocument } from '@/schemas/user.schema';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { comparePassword, generateHashPassword } from '@/utils/common.util';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './dto/login-response.dto';
import { MailService } from '@/mail/mail.service';
import { Token, TokenDocument } from '@/schemas/token.schema';
import { NoDataResponse } from '@/dtos/nodata-response.dto';
import { UserService } from '@/user/user.service';
import { AuthMeResponse } from './dto/authme-response.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<Token>,
    @InjectConnection() private connection: mongoose.Connection,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
  ) {}

  public async register(payload: RegisterDto): Promise<NoDataResponse> {
    /* Flow register
    1. Check email and username is already exist or not
    2. Hash password
    3. Create user
    4. Generate token
    5. Send email activation
    */

    const { email, username, password } = payload;
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const check = await this.userService.findUserByEmailOrUsername(
        email,
        username,
      );
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

      const user = await this.userService.createUserFromRegister(
        payload,
        session,
      );
      const token = await this.generateToken(user, session);
      this.mailService.sendActivationAccount(email, username, token);
      await session.commitTransaction();
      return;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  public async login(payload: LoginDto): Promise<LoginResponse> {
    /* Flow login
    1. Find user by username or email
    2. Compare password
    3. Generate jwt token
    */
    const { username, password } = payload;
    const email = username;
    try {
      const user = await this.userService.findUserByEmailOrUsername(
        email,
        username,
      );
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
        _id: user._id,
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

  public async me(_id: string): Promise<AuthMeResponse> {
    /* Flow my profile
    1. Find user by id
    2. Return user data
    */
    try {
      const user = await this.userService.getUserById(_id);

      return {
        _id: user._id.toString(),
        username: user.username,
        fullname: user.fullname,
        points: user.points,
        avatar: user.avatar,
        roles: user.roles,
        email: user.email,
        address: user.address,
        bio: user.bio,
        github: user.github,
        website: user.website,
        provider: user.provider,
      };
    } catch (error) {
      throw error;
    }
  }

  public async activateAccount(key: string): Promise<NoDataResponse> {
    /* Flow activate account
    1. Find token
    2. Find user by id
    3. Update user
    4. Delete token
    */

    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const token = await this.findTokenByKey(key);
      await this.userService.activateUser(
        token.user['_id'].toString(),
        session,
      );
      await this.tokenModel.deleteOne({ _id: token._id }).session(session);
      await session.commitTransaction();
      return;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  public async forgotPassword(
    payload: ForgotPasswordDto,
  ): Promise<NoDataResponse> {
    /* Flow forgot password
    1. Find user by email
    2. Generate token
    3. Build link
    4. Send email reset password
    */

    const { email } = payload;
    try {
      const user = await this.userService.findUserByEmailOrUsername(
        email,
        email,
      );

      const token = await this.generateToken(user);
      const link = `${
        process.env.FRONTEND_URL as string
      }/auth/reset-password/${token}}`;
      this.mailService.sendResetPassword(email, user.username, link);

      return;
    } catch (error) {
      throw error;
    }
  }

  private async generateToken(
    user: UserDocument,
    session: mongoose.ClientSession | null = null,
  ): Promise<string> {
    try {
      await this.tokenModel.deleteMany({ user: user._id }).session(session);
      const token = await this.tokenModel.create([{ user: user._id }], {
        session,
      });

      return token[0].key;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private async findTokenByKey(key: string): Promise<TokenDocument> {
    try {
      const token = await this.tokenModel
        .findOne({ key })
        .populate({ path: 'user', select: '_id username' })
        .exec();

      if (!token) {
        throw new BadRequestException({
          status_code: HttpStatus.BAD_REQUEST,
          message: 'Invalid token',
          error: 'Bad Request',
        });
      }

      return token;
    } catch (error) {
      throw error;
    }
  }
}
