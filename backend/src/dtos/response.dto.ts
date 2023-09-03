import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse {
  @ApiProperty({
    description: 'Status code of response',
    type: Number,
    example: 200,
  })
  status_code: number;

  @ApiProperty({
    description: 'Message of response',
    type: String,
    example: 'Successfully retrieved data',
  })
  message: string;
}
