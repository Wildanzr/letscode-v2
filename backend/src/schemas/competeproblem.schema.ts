import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUpdate } from './createupdate.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { Compete } from './compete.schema';
import { Problem } from './problem.schema';

@Schema()
export class CompeteProblem extends CreateUpdate {
  @Prop({
    required: true,
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Compete.name,
    },
  })
  compete: Compete;

  @Prop({
    required: true,
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Problem.name,
    },
  })
  problem: Problem;
}

export type CompeteProblemDocument = HydratedDocument<CompeteProblem>;
export const CompeteProblemSchema =
  SchemaFactory.createForClass(CompeteProblem);
