import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@/schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { RegisterDto } from '@/auth/dto/register.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async createUserFromRegister(
    payload: RegisterDto,
    session: mongoose.ClientSession | null = null,
  ): Promise<UserDocument> {
    try {
      const user = await this.userModel.create([payload], { session });
      return user[0];
    } catch (error) {
      throw error;
    }
  }

  public async findUserByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<UserDocument> {
    try {
      return await this.userModel.findOne({
        $or: [{ email }, { username }],
      });
    } catch (error) {
      throw error;
    }
  }

  public async getUserById(_id: string): Promise<UserDocument> {
    try {
      const user = await this.userModel.findById(_id);

      if (!user) {
        throw new NotFoundException({
          status_code: HttpStatus.NOT_FOUND,
          message: 'User not found',
          error: 'Not Found',
        });
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  public async activateUser(
    _id: string,
    session: mongoose.ClientSession | null = null,
  ): Promise<void> {
    try {
      await this.userModel.findByIdAndUpdate(
        _id,
        { email_verified: true, updated_at: new Date() },
        { session, new: true },
      );
    } catch (error) {
      throw error;
    }
  }
}
