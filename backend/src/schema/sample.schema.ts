import { nanoid } from '@/utils/common.util';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUpdate } from './createupdate.schema';
import { HydratedDocument } from 'mongoose';

export type SampleDocument = HydratedDocument<Sample>;

@Schema()
export class Sample extends CreateUpdate {
  @Prop({
    required: false,
    _id: true,
    type: String,
    unique: true,
    index: true,
    default: () => `spl-${nanoid(15)}`,
  })
  _id: string;

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

export const SampleSchema = SchemaFactory.createForClass(Sample);
