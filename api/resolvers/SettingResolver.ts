import { ObjectId } from 'mongodb';
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';

import { Setting, SettingModel } from '../entity/Setting';
import { User, UserModel } from '../entity/User';
import { isAuth } from '../middleware/isAuth';
import { ObjectIdScalar } from '../schema/object-id.scalar';
import { MyContext } from '../types/MyContext';
import { SettingInput } from '../types/SettingInput';

@Resolver(() => Setting)
export class SettingResolver {
  @Query(() => Setting, { nullable: true })
  setting(@Arg('settingId', () => ObjectIdScalar) settingId: ObjectId) {
    return SettingModel.findById(settingId);
  }

  @Query(() => [Setting])
  @UseMiddleware(isAuth)
  settings(@Ctx() ctx: MyContext) {
    return SettingModel.find({ user: ctx.res.locals.userId });
  }

  @Mutation(() => Setting)
  @UseMiddleware(isAuth)
  async editSetting(
    @Arg('input') settingInput: SettingInput,
    @Ctx() ctx: MyContext,
  ): Promise<Setting> {
    const { id, sound, money, rate, complexity } = settingInput;
    const setting = await SettingModel.findOneAndUpdate(
      { _id: id, user: ctx.res.locals.userId },
      { sound, money, rate, complexity },
      { runValidators: true, new: true },
    );
    if (!setting) {
      throw new Error('Setting not found');
    }
    return setting;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteSetting(
    @Arg('settingId', () => ObjectIdScalar) settingId: ObjectId,
    @Ctx() ctx: MyContext,
  ): Promise<boolean | undefined> {
    const deleted = await SettingModel.findOneAndDelete({
      _id: settingId,
      user: ctx.res.locals.userId,
    });

    if (!deleted) {
      throw new Error('Setting not found');
    }
    return true;
  }

  @FieldResolver()
  async user(@Root() setting: Setting): Promise<User | null> {
    return await UserModel.findById(setting.user);
  }
}
