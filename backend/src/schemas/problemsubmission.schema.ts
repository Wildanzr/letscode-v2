import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUpdate } from './createupdate.schema';
import { nanoid } from '@/utils/common.util';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProblemSubmissionDocument = HydratedDocument<ProblemSubmission>;

@Schema()
export class ProblemSubmission extends CreateUpdate {
  @Prop({
    required: false,
    _id: true,
    type: String,
    unique: true,
    index: true,
    default: () => `psb-${nanoid(15)}`,
  })
  _id: string;

  @Prop({
    required: true,
    index: true,
    type: { type: mongoose.Schema.Types.String, ref: 'User' },
  })
  user_id: string;

  @Prop({
    required: true,
    index: true,
    type: { type: mongoose.Schema.Types.String, ref: 'CompeteProblem' },
  })
  compete_problem_id: string;

  @Prop({
    required: false,
    type: [{ type: mongoose.Schema.Types.String, ref: 'Submission' }],
    default: [],
  })
  submissions: string[];

  @Prop({
    required: false,
    type: Number,
    default: 0,
  })
  current_points: number;
}

export const ProblemSubmissionSchema =
  SchemaFactory.createForClass(ProblemSubmission);
