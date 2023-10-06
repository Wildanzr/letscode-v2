import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUpdate } from './createupdate.schema';
import { nanoid } from '@/utils/common.util';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { Test } from './test.schema';
import { Sample } from './sample.schema';

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
    type: [
      {
        type: MongooseSchema.Types.String,
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
    required: true,
    type: [
      {
        type: MongooseSchema.Types.String,
        ref: Test.name,
      },
    ],
    default: [],
  })
  test_cases: Test[];

  @Prop({
    required: true,
    type: [
      {
        type: MongooseSchema.Types.String,
        ref: Sample.name,
      },
    ],
    default: [],
  })
  sample_cases: Sample[];
}

export const ProblemSchema = SchemaFactory.createForClass(Problem);
