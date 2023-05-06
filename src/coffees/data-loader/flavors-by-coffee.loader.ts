import { Injectable, Scope } from '@nestjs/common';

import { Flavor } from '../entities/flavor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Coffee } from '../entities/coffee.entity';
import DataLoader from 'dataloader';
/* 
https://blog.logrocket.com/use-dataloader-nestjs/
This is needed so for each coffee we can batch load the flavors. Wont do a separate req for each flavor
*/
@Injectable({ scope: Scope.REQUEST })
export class FlavorsByCoffeeLoader extends DataLoader<number, Flavor[]> {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(coffeeIds: readonly number[]): Promise<Flavor[][]> {
    const coffeesWithFlavors = await this.coffeesRepository.find({
      select: ['id'],
      relations: {
        flavors: true,
      },
      where: {
        id: In(coffeeIds as number[]),
      },
    });

    return coffeesWithFlavors.map((coffee) => coffee.flavors);
  }
}
