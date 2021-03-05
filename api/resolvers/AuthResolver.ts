import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Arg, Mutation, Resolver } from 'type-graphql';

import { SettingModel } from '../entity/Setting';
import { UserModel } from '../entity/User';
import { AuthInput } from '../types/AuthInput';
import { UserResponse } from '../types/UserResponse';

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('input')
    { username, email, password }: AuthInput,
  ): Promise<UserResponse> {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ username, email, password: hashedPassword });
    await user.save();

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.SESSION_SECRET || 'PWzpwOxdpwG8yPae');

    const defaultSetting = await new SettingModel({
      sound: true,
      music: false,
      volume: 100,
      money: 500,
      rate: 50,
      balance: 0,
      games: 0,
      complexity: false,
      user: user.id,
    });

    await defaultSetting.save();

    return { user, token };
  }

  @Mutation(() => UserResponse)
  async login(@Arg('input') { email, password }: AuthInput): Promise<UserResponse> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error('Invalid login');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid login');
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.SESSION_SECRET || 'PWzpwOxdpwG8yPae');

    return { user, token };
  }
}
