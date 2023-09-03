import { ApiProperty } from '@nestjs/swagger';

export class MetaResponse {
  @ApiProperty({
    description: 'Meta of response',
    type: Object,
  })
  meta?: any;
}
