import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUpdate } from './createupdate.schema';
import { nanoid } from '@/utils/common.util';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { CompeteProblem } from './competeproblem.schema';
import { Submission } from './submission.schema';

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
    type: { type: MongooseSchema.Types.String, ref: User.name },
  })
  user_id: User;

  @Prop({
    required: true,
    index: true,
    type: { type: MongooseSchema.Types.String, ref: CompeteProblem.name },
  })
  compete_problem_id: CompeteProblem;

  @Prop({
    required: false,
    type: [{ type: MongooseSchema.Types.String, ref: Submission.name }],
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

export const ProblemSubmissionSchema =
  SchemaFactory.createForClass(ProblemSubmission);
