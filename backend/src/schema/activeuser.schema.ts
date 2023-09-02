import { nanoid } from '@/utils/common.util';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CreateUpdate } from './createupdate.schema';

export type ActiveUserDocument = HydratedDocument<ActiveUser>;

@Schema()
export class ActiveUser extends CreateUpdate {
  @Prop({
    required: false,
    _id: true,
    type: String,
    unique: true,
    index: true,
    default: () => `act-${nanoid(15)}`,
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
    unique: true,
    index: true,
  })
  socket_id: string;
}

export const ActiveUserSchema = SchemaFactory.createForClass(ActiveUser);
