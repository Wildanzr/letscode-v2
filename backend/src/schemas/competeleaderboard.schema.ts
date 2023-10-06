import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { CreateUpdate } from './createupdate.schema';
import { nanoid } from '@/utils/common.util';
import { User } from './user.schema';
import { Compete } from './compete.schema';

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
    type: {
      type: MongooseSchema.Types.String,
      ref: User.name,
    },
  })
  user_id: User;

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
    required: false,
    type: Number,
    default: 0,
  })
  points: number;
}

export const CompeteLeaderboardSchema =
  SchemaFactory.createForClass(CompeteLeaderboard);
