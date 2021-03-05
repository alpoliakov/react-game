import { getModelForClass, prop as Property } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';

import { Ref } from '../types/Ref';
import { User } from './User';

@ObjectType()
export class Setting {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  sound: boolean;

  @Field()
  @Property({ required: true })
  music: boolean;

  @Field()
  @Property({ required: true })
  volume: number;

  @Field()
  @Property({ required: true })
  money: number;

  @Field()
  @Property({ required: true })
  rate: number;

  @Field()
  @Property()
  balance: number;

  @Field()
  @Property()
  games: number;

  @Field()
  @Property({ required: true })
  complexity: boolean;

  @Field(() => User)
  @Property({ ref: User, required: true })
  user: Ref<User>;
}

export const SettingModel = getModelForClass(Setting);
