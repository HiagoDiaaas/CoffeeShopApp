import Coffee from './Coffee';

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
}
