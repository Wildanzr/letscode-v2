import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseCreateUser } from './dto/response-create-user.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto): ResponseCreateUser {
    const result = {
      status_code: 200,
      message: 'Success',
      data: createUserDto,
    };
    return result;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}