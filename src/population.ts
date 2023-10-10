interface Person {
    name: string;
    money: number;
    timeAvailable: number;
    consumeTime(provider: Person, hours: number, pricePerHour: number): boolean;
    sellTime(hours: number, pricePerHour: number): void;
  }
  
  export class Citizen implements Person {
    name: string;
    money: number;
    timeAvailable: number;
  
    constructor(name: string) {
      this.name = name;
      this.money = Math.floor(Math.random() * 200);
      this.timeAvailable = 24;
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
  