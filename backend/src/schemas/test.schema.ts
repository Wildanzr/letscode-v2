import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUpdate } from './createupdate.schema';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Test extends CreateUpdate {
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

export type TestDocument = HydratedDocument<Test>;
export const TestSchema = SchemaFactory.createForClass(Test);
