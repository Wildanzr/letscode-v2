import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponse {
  @ApiProperty({
    description: 'Message of response',
    type: String,
    example: 'Cannot GET /api/v1/404',
  })
  message: string;

  @ApiProperty({
    description: 'Status code of response',
    type: Number,
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error of response',
    type: String,
    example: 'Not Found',
  })
  error: string;
}
