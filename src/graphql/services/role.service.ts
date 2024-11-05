import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../models';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async getRoleById(id: number): Promise<Role | undefined> {
    const role = await this.rolesRepository.findOneBy({
      id,
    });
    return role;
  }
}
