import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { nanoid } from 'nanoid';
import { CreateUpdate } from './createupdate.schema';
import { User } from './user.schema';

export type TokenDocument = HydratedDocument<Token>;

@Schema({ autoIndex: true })
export class Token extends CreateUpdate {
  @Prop({
    required: false,
    _id: true,
    type: String,
    default: () => `tkn-${nanoid(60)}`,
  })
  _id: string;

  @Prop({
    type: {
      type: MongooseSchema.Types.String,
      ref: User.name,
      required: true,
    },
  })
  user_id: User;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
