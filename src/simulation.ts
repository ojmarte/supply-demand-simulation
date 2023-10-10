import { Citizen } from "./population";

const population: Citizen[] = Array(100).fill(null).map((_, idx) => new Citizen(`Citizen${idx + 1}`));
let pricePerHour = 10;

// Print initial values of each citizen
console.log("Initial status of each citizen:");
population.forEach(citizen => {
  console.log(`${citizen.name}: $${citizen.money}`);
});
console.log('------------------------------------');

for (let i = 0; i < 1000; i++) {
  const shuffledPopulation = [...population].sort(() => 0.5 - Math.random());

  const [timeConsumers, timeSellers] = [shuffledPopulation.slice(0, 500), shuffledPopulation.slice(500)];

  let successfulTransactions = 0;
  timeConsumers.forEach(consumer => {
    const hoursWanted = Math.floor(Math.random() * 4) + 1;

    for (const seller of timeSellers) {
      if (consumer.consumeTime(seller, hoursWanted, pricePerHour)) {
        successfulTransactions++;
        break;
      }
    }
  });

  const demandSupplyRatio = timeConsumers.length / (timeSellers.length - successfulTransactions);
  if (demandSupplyRatio > 1) {
    pricePerHour += 1;
  } else {
    pricePerHour = Math.max(1, pricePerHour - 1);
  }
}

// Print final values of each citizen after 1000 iterations
console.log("Final status of each citizen after 1000 iterations:");
population.forEach(citizen => {
  console.log(`${citizen.name}: $${citizen.money}`);
});
