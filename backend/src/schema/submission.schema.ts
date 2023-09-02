import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUpdate } from './createupdate.schema';
import { nanoid } from '@/utils/common.util';
import mongoose, { HydratedDocument } from 'mongoose';

export type SubmissionDocument = HydratedDocument<Submission>;

@Schema()
export class Submission extends CreateUpdate {
  @Prop({
    required: false,
    _id: true,
    type: String,
    unique: true,
    index: true,
    default: () => `sbm-${nanoid(15)}`,
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

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
