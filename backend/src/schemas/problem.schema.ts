import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUpdate } from './createupdate.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Test } from './test.schema';
import { Sample } from './sample.schema';

@Schema()
export class Problem extends CreateUpdate {
  @Prop({
    required: true,
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name,
      },
    ],
    default: [],
  })
  collaborators: User[];

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
    required: false,
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Test.name,
      },
    ],
    default: [],
  })
  test_cases: Test[];

  @Prop({
    required: false,
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Sample.name,
      },
    ],
    default: [],
  })
  sample_cases: Sample[];
}

export type ProblemDocument = HydratedDocument<Problem>;
export const ProblemSchema = SchemaFactory.createForClass(Problem);
