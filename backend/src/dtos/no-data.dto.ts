import { ApiProperty } from '@nestjs/swagger';

export class NoDataDto {
  @ApiProperty({
    description: 'Data of response',
    type: Object,
    example: {},
  })
  data: object;
}
