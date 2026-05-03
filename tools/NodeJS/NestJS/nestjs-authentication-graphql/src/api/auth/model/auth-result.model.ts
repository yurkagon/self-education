import { Field, ObjectType } from '@nestjs/graphql';

import { UserModel } from '../../user/model/user.model.js';

@ObjectType()
export class AuthResult {
  @Field(() => UserModel)
  user: UserModel;
}
