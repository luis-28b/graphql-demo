import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../models';
import { CreateUserInput, UpdateUserInput } from '../inputs';

// Use Injectable because it tells to nestJS is going to be a provider
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = this.usersRepository.find();
    return users;
  }

  async getUserById(id: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOneBy({
      id,
    });
    return user;
  }

  async createUser(user: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async updateUser(user: UpdateUserInput): Promise<User> {
    const userToUpdate = await this.usersRepository.findOneBy({ id: user.id });
    if (userToUpdate) {
      userToUpdate.displayName = user.displayName ?? userToUpdate.displayName;
      userToUpdate.roleId = user.roleId ?? userToUpdate.roleId;
      return this.usersRepository.save(userToUpdate);
    } else {
      throw new Error('User not found');
    }
  }
}
