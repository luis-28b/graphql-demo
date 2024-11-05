import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

import { Role } from './role.model';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  username: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  displayName?: string;

  @PrimaryColumn()
  @Field(() => Int, { nullable: true })
  roleId?: number;

  @ManyToOne(() => Role, { nullable: true })
  @JoinColumn({ name: 'roleId' })
  @Field(() => Role, { nullable: true })
  role?: Role;
}
