import { ApiProperty } from '@nestjs/swagger';

export class BadResponse {
  @ApiProperty({
    description: 'Status code of response',
    type: Number,
    example: 400,
  })
  status_code: number;

  @ApiProperty({
    description: 'Message of response',
    type: [String],
    example: ['password should not be empty', 'password must be a string'],
  })
  message: string[];

  @ApiProperty({
    description: 'Error of response',
    type: String,
    example: 'Bad Request',
  })
  error: string;
}
