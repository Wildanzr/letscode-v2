import { nanoid } from '@/utils/common.util';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { CreateUpdate } from './createupdate.schema';
import { User } from './user.schema';

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
    type: {
      type: MongooseSchema.Types.String,
      ref: User.name,
    },
  })
  user_id: User;

  @Prop({
    required: true,
    type: String,
    unique: true,
    index: true,
  })
  socket_id: string;
}

export const ActiveUserSchema = SchemaFactory.createForClass(ActiveUser);
