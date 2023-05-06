import { createUnionType } from '@nestjs/graphql';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Tea } from 'src/coffees/entities/tea.entity';

export const DrinksResultUnion = createUnionType({
  name: 'DrinksResult',
  types: () => [Coffee, Tea],
});
/* 
! With union types its always needed to use inline fragments to get the data

{
    drinks {
        ... on Tea {
            name
        }
        ... on Coffee {
            name
            brand
        }
    }
}

*/
