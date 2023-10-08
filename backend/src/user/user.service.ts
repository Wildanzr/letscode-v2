import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@/schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { RegisterDto } from '@/auth/dto/register.dto';

@Injectable()
export class UserService {
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
}
