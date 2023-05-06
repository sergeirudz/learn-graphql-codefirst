import { ObjectType } from '@nestjs/graphql';
import { Drink } from 'src/common/interfaces/drink.interface';

@ObjectType({ implements: () => Drink }) // reference to the interface that this entity implements
export class Tea implements Drink {
  name: string;
}
