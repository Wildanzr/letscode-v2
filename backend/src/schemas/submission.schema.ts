import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUpdate } from './createupdate.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Submission extends CreateUpdate {
  @Prop({
    required: true,
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User.name,
    },
  })
  user: User;

  @Prop({
    required: true,
    type: String,
  })
  code: string;

  @Prop({
    required: true,
    type: Number,
  })
  language_id: number;

  @Prop({
    required: false,
    type: Number,
    default: 1,
  })
  status: number;

  @Prop({
    required: false,
    type: Number,
    default: 0,
  })
  points: number;
}

export type SubmissionDocument = HydratedDocument<Submission>;
export const SubmissionSchema = SchemaFactory.createForClass(Submission);
