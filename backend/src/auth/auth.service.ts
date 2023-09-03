import { User } from '@/schemas/user.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { generateHashPassword } from '@/utils/common.util';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(payload: RegisterDto): Promise<void> {
    const { email, username, password } = payload;
    try {
      const check = await this.checkEmailandUsername(email, username);
      if (check) {
        throw new BadRequestException('Email or username already exists');
      }

      const hashed = await generateHashPassword(password);
      payload.password = hashed;

      await this.userModel.create(payload);
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
