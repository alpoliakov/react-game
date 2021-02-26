import { ObjectId } from 'mongodb';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';

import { SettingModel } from '../entity/Setting';
import { User, UserModel } from '../entity/User';
import { isAuth } from '../middleware/isAuth';
import { ObjectIdScalar } from '../schema/object-id.scalar';
import { MyContext } from '../types/MyContext';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg('userId', () => ObjectIdScalar) userId: ObjectId) {
    return await UserModel.findById(userId);
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async currentUser(
    @Ctx()
    ctx: MyContext,
  ): Promise<User | null> {
    return await UserModel.findById(ctx.res.locals.userId);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUser(
    @Arg('userId', () => ObjectIdScalar) userId: ObjectId,
    @Ctx() ctx: MyContext,
  ): Promise<boolean | undefined> {
    const deletedUser = await UserModel.findOneAndDelete({
      _id: userId,
    });

    await SettingModel.findOneAndDelete({
      user: ctx.res.locals.userId,
    });

    if (!deletedUser) {
      throw new Error('User not found');
    }

    return true;
  }
}
