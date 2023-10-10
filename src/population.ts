interface Person {
    name: string;
    money: number;
    timeAvailable: number;
    spendProbability: number;
    consumeTime(provider: Person, hours: number, pricePerHour: number): boolean;
    sellTime(hours: number, pricePerHour: number): void;
  }
  
export class Citizen implements Person {
    name: string;
    money: number;
    timeAvailable: number;
    spendProbability: number;
  
    constructor(name: string) {
      this.name = name;
      this.money = 1;
      this.timeAvailable = 24;
      this.spendProbability = Math.random(); // Randomly assigns a spend probability between 0 and 1
    }
  
    consumeTime(provider: Person, hours: number, pricePerHour: number): boolean {
      if (this.money >= (pricePerHour * hours) && provider.timeAvailable >= hours) {
        this.money -= pricePerHour * hours;
        provider.money += pricePerHour * hours;
        provider.timeAvailable -= hours;
        return true;
      }
      return false;
    }
  
    sellTime(hours: number, pricePerHour: number) {
      if (this.timeAvailable >= hours) {
        this.timeAvailable -= hours;
      }
    }
  }
  