import { ProviderType } from '@/enums/provider.enum';
import { UserRoleType } from '@/enums/user.enum';
import { generateRandomUserPicture } from '@/utils/common.util';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CreateUpdate } from './createupdate.schema';

@Schema()
export class User extends CreateUpdate {
  @Prop({
    required: true,
    type: String,
    unique: true,
    index: true,
    lowercase: true,
  })
  username: string;

  @Prop({
    required: false,
    type: String,
    lowercase: true,
    index: {
      unique: true,
      sparse: true,
      partialFilterExpression: { email: { $type: 'string' } },
    },
    default: null,
  })
  email: string;

  @Prop({
    required: false,
    type: String,
    default: null,
  })
  password: string;

  @Prop({
    required: false,
    type: String,
    default: null,
  })
  fullname: string;

  @Prop({
    required: false,
    type: String,
    default: (user: User) => {
      return generateRandomUserPicture(user.username);
    },
  })
  avatar: string;

  @Prop({
    required: false,
    type: [String],
    enum: UserRoleType,
    default: [UserRoleType.STUDENT],
  })
  roles: UserRoleType[];

  @Prop({
    required: false,
    type: String,
    default: null,
  })
  bio: string;

  @Prop({
    required: false,
    type: String,
    default: null,
  })
  address: string;

  @Prop({
    required: false,
    type: String,
    default: null,
  })
  github: string;

  @Prop({
    required: false,
    type: String,
    default: null,
  })
  website: string;

  @Prop({
    required: false,
    type: Boolean,
    default: false,
  })
  email_verified: boolean;

  @Prop({
    required: false,
    type: [String],
    enum: ProviderType,
    default: [ProviderType.LOCAL],
  })
  provider: ProviderType[];

  @Prop({
    required: false,
    type: String,
    index: {
      unique: true,
      sparse: true,
      partialFilterExpression: { google_id: { $type: 'string' } },
    },
    default: null,
  })
  google_id: string;

  @Prop({
    required: false,
    type: String,
    index: {
      unique: true,
      sparse: true,
      partialFilterExpression: { github_id: { $type: 'string' } },
    },
    default: null,
  })
  github_id: string;

  @Prop({
    required: false,
    type: String,
    index: {
      unique: true,
      sparse: true,
      partialFilterExpression: { twitter_id: { $type: 'string' } },
    },
    default: null,
  })
  twitter_id: string;

  @Prop({
    required: false,
    type: Number,
    default: 0,
  })
  points: number;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
