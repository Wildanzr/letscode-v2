import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app.service';
import { BadResponse } from './dtos/bad.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { NotFoundResponse } from './dtos/notfound.dto';

@Controller()
@ApiBadRequestResponse({ type: BadResponse })
@ApiNotFoundResponse({ type: NotFoundResponse })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
