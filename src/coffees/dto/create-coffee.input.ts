import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { CoffeeType } from '../enums/coffee-type.enum';

@InputType()
export class CreateCoffeeInput {
  @MinLength(3)
  @Field(() => String, { description: 'The new coffee name.' })
  name: string;
  brand: string;
  // @Field(() => [String])
  flavors: string[];
  type: CoffeeType;
}
