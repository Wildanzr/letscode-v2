import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { nanoid } from 'nanoid';
import { User } from './user.schema';

@Schema()
export class Token {
  @Prop({
    required: false,
    type: String,
    unique: true,
    default: () => `${nanoid(50)}`,
  })
  key: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: User;

  @Prop({
    required: false,
    type: Date,
    expires: 7 * 24 * 60 * 60, // 7 days expiry
    default: Date.now,
  })
  expires_at: Date;
}

export type TokenDocument = HydratedDocument<Token>;
export const TokenSchema = SchemaFactory.createForClass(Token);
