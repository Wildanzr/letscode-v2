import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUpdate } from './createupdate.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { CompeteProblem } from './competeproblem.schema';
import { Submission } from './submission.schema';

@Schema()
export class ProblemSubmission extends CreateUpdate {
  @Prop({
    required: true,
    type: { type: mongoose.Schema.Types.ObjectId, ref: User.name },
  })
  user: User;

  @Prop({
    required: true,
    type: { type: mongoose.Schema.Types.ObjectId, ref: CompeteProblem.name },
  })
  compete_problem: CompeteProblem;

  @Prop({
    required: false,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Submission.name }],
    default: [],
  })
  submissions: Submission[];

  @Prop({
    required: false,
    type: Number,
    default: 0,
  })
  current_points: number;
}

export type ProblemSubmissionDocument = HydratedDocument<ProblemSubmission>;
export const ProblemSubmissionSchema =
  SchemaFactory.createForClass(ProblemSubmission);
