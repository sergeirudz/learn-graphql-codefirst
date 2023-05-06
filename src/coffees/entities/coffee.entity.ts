import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';
import { Drink } from 'src/common/interfaces/drink.interface';
import { CoffeeType } from '../enums/coffee-type.enum';
import { loggerMiddleware } from 'src/middleware/logger.middleware';

@Entity()
@ObjectType({
  description: 'The coffee model',
  implements: () => Drink,
})
export class Coffee implements Drink {
  @PrimaryGeneratedColumn()
  @Field(() => ID, {
    nullable: false,
    description: 'The ID of the coffee',
  })
  id: number;

  @Field({ middleware: [loggerMiddleware] })
  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, {
    cascade: true, // inverse side also inserts the relation
  })
  flavors?: Flavor[];

  @CreateDateColumn()
  createdAt?: Date;

  @Column({ nullable: true })
  type?: CoffeeType;
}
