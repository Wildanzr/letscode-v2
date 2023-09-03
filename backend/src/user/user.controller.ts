import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseCreateUser } from './dto/response-create-user.dto';
import { BadResponse } from '@/dtos/bad.dto';
import { NotFoundResponse } from '@/dtos/notfound.dto';

@Controller('user')
@ApiTags('User')
@ApiBadRequestResponse({ type: BadResponse })
@ApiNotFoundResponse({ type: NotFoundResponse })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOkResponse({ type: ResponseCreateUser })
  @HttpCode(HttpStatus.OK)
  create(@Body() createUserDto: CreateUserDto): ResponseCreateUser {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
