import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUpdate } from './createupdate.schema';
import { nanoid } from '@/utils/common.util';
import mongoose, { HydratedDocument } from 'mongoose';

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
    type: { type: mongoose.Schema.Types.String, ref: 'Compete' },
  })
  compete_id: string;

  @Prop({
    required: true,
    index: true,
    type: { type: mongoose.Schema.Types.String, ref: 'Problem' },
  })
  problem_id: string;
}

export const CompeteProblemSchema =
  SchemaFactory.createForClass(CompeteProblem);
