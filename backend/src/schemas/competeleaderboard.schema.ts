import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CreateUpdate } from './createupdate.schema';
import { User } from './user.schema';
import { Compete } from './compete.schema';

@Schema()
export class CompeteLeaderboard extends CreateUpdate {
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
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Compete.name,
    },
  })
  compete: Compete;

  @Prop({
    required: false,
    type: Number,
    default: 0,
  })
  points: number;
}

export type CompeteLeaderboardDocument = HydratedDocument<CompeteLeaderboard>;
export const CompeteLeaderboardSchema =
  SchemaFactory.createForClass(CompeteLeaderboard);
