import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUpdate } from './createupdate.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { CompeteType } from '@/enums/compete.enum';
import { User } from './user.schema';

@Schema()
export class Compete extends CreateUpdate {
  @Prop({
    required: true,
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User.name,
    },
  })
  challenger: User;

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
    required: false,
    type: String,
    enum: CompeteType,
    default: CompeteType.LEARNING,
  })
  type: CompeteType;

  @Prop({
    required: false,
    type: [Number],
    default: [],
  })
  languages: number[];
}

export type CompeteDocument = HydratedDocument<Compete>;
export const CompeteSchema = SchemaFactory.createForClass(Compete);
