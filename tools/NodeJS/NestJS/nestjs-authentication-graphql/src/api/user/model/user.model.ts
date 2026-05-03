import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { UserRole } from '../../../../generated/prisma/client.js';

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
export class UserModel {
  @Field(() => String)
  id: string;
  @Field(() => String)
  name: string;
  @Field(() => String)
  email: string;

  @Field(() => UserRole)
  role: UserRole;
}
