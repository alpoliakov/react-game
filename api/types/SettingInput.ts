import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';

import { Setting } from '../entity/Setting';

@InputType()
export class SettingInput implements Partial<Setting> {
  @Field({ nullable: true })
  id?: ObjectId;

  @Field()
  sound: boolean;

  @Field()
  money: number;

  @Field()
  rate: number;

  @Field()
  complexity: boolean;
}
