import { makeAutoObservable } from 'mobx';
import CoffeeService from '../services/CoffeeService';
import Coffee from '../models/Coffee';

class CoffeeViewModel {
  coffees: Coffee[] = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchCoffees();
  }

  fetchCoffees(): void {
    this.coffees = CoffeeService.getAllCoffees();
  }

  addCoffee(coffee: Coffee): void {
    CoffeeService.addCoffee(coffee);
    this.fetchCoffees();
  }

  updateCoffee(coffee: Coffee): void {
    CoffeeService.updateCoffee(coffee);
    this.fetchCoffees();
  }

  deleteCoffee(id: number): void {
    CoffeeService.deleteCoffee(id);
    this.fetchCoffees();
  }
}

const coffeeViewModel = new CoffeeViewModel();
export default coffeeViewModel;
