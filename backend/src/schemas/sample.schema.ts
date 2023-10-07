import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUpdate } from './createupdate.schema';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Sample extends CreateUpdate {
  @Prop({
    required: false,
    type: String,
  })
  input: string;

  @Prop({
    required: true,
    type: String,
  })
  output: string;

  @Prop({
    required: false,
    type: String,
  })
  explanation: string;
}

export type SampleDocument = HydratedDocument<Sample>;
export const SampleSchema = SchemaFactory.createForClass(Sample);
