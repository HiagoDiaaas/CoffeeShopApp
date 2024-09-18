// app/services/CoffeeService.ts

import Coffee from '../models/Coffee';

const coffees: Coffee[] = [
  new Coffee(1, 'Espresso', 'Strong and bold coffee', 2.5),
  new Coffee(2, 'Cappuccino', 'Espresso with steamed milk foam', 3.0),
  new Coffee(3, 'Latte', 'Espresso with steamed milk', 3.5),
];

export default class CoffeeService {
  static getAllCoffees(): Coffee[] {
    return coffees;
  }

  static getCoffeeById(id: number): Coffee | undefined {
    return coffees.find((coffee) => coffee.id === id);
  }
}
