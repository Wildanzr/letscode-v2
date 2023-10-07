import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class TravelLog {
  @Prop({
    required: true,
    type: { type: mongoose.Schema.Types.ObjectId, ref: User.name },
  })
  user: User;

  @Prop({
    required: true,
    type: String,
  })
  page: string;

  @Prop({
    required: true,
    type: String,
  })
  path: string;

  @Prop({
    required: true,
    type: Date,
  })
  from: Date;

  @Prop({
    required: true,
    type: Date,
  })
  to: Date;
}

export type TravelLogDocument = HydratedDocument<TravelLog>;
export const TravelLogSchema = SchemaFactory.createForClass(TravelLog);
