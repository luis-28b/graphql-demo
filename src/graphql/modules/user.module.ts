import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserResolver } from '../resolvers';
import { RoleService, UserService } from '../services';
import { Role, User } from '../models';

@Module({
  // Added this import to say to TypeORM that UserService is part of this module
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UserResolver, UserService, RoleService],
})
export class UsersModule {}
