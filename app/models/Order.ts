import Coffee from './Coffee';
import CoffeeService from '../services/CoffeeService';

export default class Order {
  id: number;
  coffees: Coffee[];

  constructor(id: number, coffees: Coffee[]) {
    this.id = id;
    this.coffees = coffees;
  }

  getTotalPrice(): number {
    return this.coffees.reduce((total, coffee) => total + coffee.price, 0);
  }

  static fromJSON(json: any): Order {
    const coffees = json.coffees.map((coffeeId: number) =>
      CoffeeService.getCoffeeById(coffeeId)
    ).filter((coffee: Coffee | undefined): coffee is Coffee => coffee !== undefined);
    return new Order(json.id, coffees);
  }

  toJSON() {
    return {
      id: this.id,
      coffees: this.coffees.map((coffee) => coffee.id),
    };
  }
}
