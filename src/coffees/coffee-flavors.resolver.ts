// import { FlavorsByCoffeeLoader } from './data-loader/flavors-by-coffee.loader';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(() => Coffee)
export class CoffeeFlavorsResolver {
  constructor(
    @InjectRepository(Flavor)
    private readonly flavorsRepository: Repository<Flavor>, // private readonly FlavorsByCoffeeLoader: FlavorsByCoffeeLoader,
  ) {}

  @ResolveField('flavors', () => [Flavor])
  async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
    return this.flavorsRepository
      .createQueryBuilder('flavor')
      .innerJoin('flavor.coffees', 'coffee', 'coffee.id = :coffeeId', {
        coffeeId: coffee.id,
      })
      .getMany();
    // return this.FlavorsByCoffeeLoader.load(coffee.id);
  }
}
