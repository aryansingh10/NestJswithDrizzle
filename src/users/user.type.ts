import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;
}
