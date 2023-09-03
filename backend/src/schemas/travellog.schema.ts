import { nanoid } from '@/utils/common.util';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TravelLogDocument = HydratedDocument<TravelLog>;

@Schema()
export class TravelLog {
  @Prop({
    required: false,
    _id: true,
    type: String,
    unique: true,
    index: true,
    default: () => `trv-${nanoid(15)}`,
  })
  _id: string;

  @Prop({
    required: true,
    type: { type: mongoose.Schema.Types.String, ref: 'User' },
  })
  user_id: string;

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

export const TravelLogSchema = SchemaFactory.createForClass(TravelLog);
