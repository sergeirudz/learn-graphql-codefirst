import { registerEnumType } from '@nestjs/graphql';

export enum CoffeeType {
  ESPRESSO = 'espresso',
  AMERICANO = 'americano',
}

registerEnumType(CoffeeType, {
  name: 'CoffeeType',
  description: 'Type of coffee',
});
