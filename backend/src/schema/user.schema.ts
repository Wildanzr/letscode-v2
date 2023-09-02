import { ProviderType } from '@/enum/provider.enum';
import { UserRoleType } from '@/enum/user.enum';
import { generateRandomUserPicture, nanoid } from '@/utils/common.util';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CreateUpdate } from './createupdate.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends CreateUpdate {
  @Prop({
    required: false,
    _id: true,
    type: String,
    unique: true,
    index: true,
    default: () => `usr-${nanoid(15)}`,
  })
  _id: string;

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
    unique: true,
    default: null,
    lowercase: true,
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
    required: true,
    type: String,
    default: (user: User) => {
      return generateRandomUserPicture(user.username);
    },
  })
  avatar: string;

  @Prop({
    required: true,
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
    unique: true,
    default: null,
  })
  google_id: string;

  @Prop({
    required: false,
    type: String,
    unique: true,
    default: null,
  })
  github_id: string;

  @Prop({
    required: false,
    type: String,
    unique: true,
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

export const UserSchema = SchemaFactory.createForClass(User);
