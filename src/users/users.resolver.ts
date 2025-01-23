import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './user.type';
import { CreateUserInput } from './dto/create-user.input';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserType])
  async users() {
    return await this.usersService.findAll();
  }

  @Query(() => UserType, { nullable: true })
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.create(input);
  }
}
