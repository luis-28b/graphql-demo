import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field()
  roleId: number;
}

@InputType()
export class UpdateUserInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  roleId?: number;
}
