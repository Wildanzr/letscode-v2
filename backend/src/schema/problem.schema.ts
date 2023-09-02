import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUpdate } from './createupdate.schema';
import { nanoid } from '@/utils/common.util';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProblemDocument = HydratedDocument<Problem>;

@Schema()
export class Problem extends CreateUpdate {
  @Prop({
    required: false,
    _id: true,
    type: String,
    unique: true,
    index: true,
    default: () => `pbl-${nanoid(15)}`,
  })
  _id: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.String, ref: 'User' }],
    default: [],
  })
  collaborators: string[];

  @Prop({
    required: true,
    type: String,
  })
  title: string;

  @Prop({
    required: true,
    type: String,
  })
  description: string;

  @Prop({
    required: true,
    type: String,
  })
  input_format: string;

  @Prop({
    required: true,
    type: String,
  })
  output_format: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.String, ref: 'Test' }],
    default: [],
  })
  test_cases: string[];

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.String, ref: 'Sample' }],
    default: [],
  })
  sample_cases: string[];
}

export const ProblemSchema = SchemaFactory.createForClass(Problem);
