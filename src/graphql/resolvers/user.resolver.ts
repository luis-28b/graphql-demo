import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { Role, User } from '../models';
import { RoleService, UserService } from '../services';
import { CreateUserInput, UpdateUserInput } from '../inputs';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @Inject(UserService)
    private userService: UserService,
    @Inject(RoleService)
    private roleService: RoleService,
  ) {}

  @Query(() => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  @Query(() => [User])
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Mutation(() => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.userService.createUser(createUserData);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserData') updateUserData: UpdateUserInput) {
    return this.userService.updateUser(updateUserData);
  }

  @ResolveField(() => Role, { nullable: true, name: 'role' })
  getRole(@Parent() user: User) {
    return this.roleService.getRoleById(user.roleId);
  }
}
