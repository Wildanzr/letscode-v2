import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUpdate } from './createupdate.schema';
import { nanoid } from '@/utils/common.util';
import mongoose, { HydratedDocument } from 'mongoose';
import { CompeteType } from '@/enum/compete.enum';

export type CompeteDocument = HydratedDocument<Compete>;

@Schema()
export class Compete extends CreateUpdate {
  @Prop({
    required: false,
    _id: true,
    type: String,
    unique: true,
    index: true,
    default: () => `cp-${nanoid(15)}`,
  })
  _id: string;

  @Prop({
    required: true,
    type: { type: mongoose.Schema.Types.String, ref: 'User' },
  })
  challenger_id: string;

  @Prop({
    required: true,
    type: String,
  })
  title: string;

  @Prop({
    required: true,
    type: String,
  })
  description: string;

  @Prop({
    required: true,
    type: Date,
  })
  start: Date;

  @Prop({
    required: true,
    type: Date,
  })
  end: Date;

  @Prop({
    required: true,
    type: String,
    enum: CompeteType,
    default: CompeteType.LEARNING,
  })
  type: CompeteType;

  @Prop({
    required: true,
    type: [Number],
    default: [],
  })
  languages: number[];
}

export const CompeteSchema = SchemaFactory.createForClass(Compete);
