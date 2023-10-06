import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUpdate } from './createupdate.schema';
import { nanoid } from '@/utils/common.util';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Compete } from './compete.schema';
import { Problem } from './problem.schema';

export type CompeteProblemDocument = HydratedDocument<CompeteProblem>;

@Schema()
export class CompeteProblem extends CreateUpdate {
  @Prop({
    required: false,
    _id: true,
    type: String,
    unique: true,
    index: true,
    default: () => `cp-${nanoid(15)}`,
  })
  _id: string;

  @Prop({
    required: true,
    index: true,
    type: {
      type: MongooseSchema.Types.String,
      ref: Compete.name,
    },
  })
  compete_id: Compete;

  @Prop({
    required: true,
    index: true,
    type: {
      type: MongooseSchema.Types.String,
      ref: Problem.name,
    },
  })
  problem_id: Problem;
}

export const CompeteProblemSchema =
  SchemaFactory.createForClass(CompeteProblem);
