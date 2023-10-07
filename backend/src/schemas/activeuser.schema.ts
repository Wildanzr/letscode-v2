import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CreateUpdate } from './createupdate.schema';
import { User } from './user.schema';

@Schema()
export class ActiveUser extends CreateUpdate {
  @Prop({
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User.name,
    },
  })
  user: User;

  @Prop({
    required: true,
    type: String,
    unique: true,
    index: true,
  })
  socket_id: string;
}

export type ActiveUserDocument = HydratedDocument<ActiveUser>;
export const ActiveUserSchema = SchemaFactory.createForClass(ActiveUser);
