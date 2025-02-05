import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class updateUserInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;
}
