import { nanoid } from '@/utils/common.util';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUpdate } from './createupdate.schema';
import { HydratedDocument } from 'mongoose';

export type TestDocument = HydratedDocument<Test>;

@Schema()
export class Test extends CreateUpdate {
  @Prop({
    required: false,
    _id: true,
    type: String,
    unique: true,
    index: true,
    default: () => `tes-${nanoid(15)}`,
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
}

export const TestSchema = SchemaFactory.createForClass(Test);
