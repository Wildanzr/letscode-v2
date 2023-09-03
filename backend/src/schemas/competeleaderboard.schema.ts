import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CreateUpdate } from './createupdate.schema';
import { nanoid } from '@/utils/common.util';

export type CompeteLeaderboardDocument = HydratedDocument<CompeteLeaderboard>;

@Schema()
export class CompeteLeaderboard extends CreateUpdate {
  @Prop({
    required: false,
    _id: true,
    type: String,
    unique: true,
    index: true,
    default: () => `clb-${nanoid(15)}`,
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
    type: { type: mongoose.Schema.Types.String, ref: 'Compete' },
  })
  compete_id: string;

  @Prop({
    required: false,
    type: Number,
    default: 0,
  })
  points: number;
}

export const CompeteLeaderboardSchema =
  SchemaFactory.createForClass(CompeteLeaderboard);
