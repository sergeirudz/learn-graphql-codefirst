import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description: ' Date custom scalar type';

  parseValue(value: number): Date {
    return new Date(value); // value from the client. Transform to Date
  }

  serialize(value: Date): number {
    // before the value is sent to the client
    // console.log('serialize', value);
    return value.getTime(); // value sent to the client
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      // determine if the value is an integer
      return new Date(ast.value);
    }
    return null;
  }
}
