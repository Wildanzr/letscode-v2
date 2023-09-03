import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponse {
  @ApiProperty({
    description: 'Status code of response',
    type: Number,
    example: 404,
  })
  status_code: number;

  @ApiProperty({
    description: 'Message of response',
    type: String,
    example: 'Cannot GET /api/v1/404',
  })
  message: string;

  @ApiProperty({
    description: 'Error of response',
    type: String,
    example: 'Not Found',
  })
  error: string;
}
