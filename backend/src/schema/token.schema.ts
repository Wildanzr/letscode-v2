import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { nanoid } from 'nanoid';
import { CreateUpdate } from './createupdate.schema';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token extends CreateUpdate {
  @Prop({
    required: false,
    _id: true,
    type: String,
    unique: true,
    index: true,
    default: () => `tkn-${nanoid(15)}`,
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
  token: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
