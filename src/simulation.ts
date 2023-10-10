import { Citizen } from "./population";

const population: Citizen[] = Array(100).fill(null).map((_, idx) => new Citizen(`Citizen${idx + 1}`));
let pricePerHour = 10;

for (let i = 0; i < 100; i++) {
  const shuffledPopulation = [...population].sort(() => 0.5 - Math.random());

  const [timeConsumers, timeSellers] = [shuffledPopulation.slice(0, 50), shuffledPopulation.slice(50)];

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

  const totalMoney = population.reduce((sum, p) => sum + p.money, 0);
  const totalHoursLeft = population.reduce((sum, p) => sum + p.timeAvailable, 0);

  console.log(`Round ${i + 1}:`);
  console.log(`Price per Hour: $${pricePerHour}`);
  console.log(`Total Money: $${totalMoney}`);
  console.log(`Total Hours Left: ${totalHoursLeft}`);
  console.log('------------------------------------');
}

// Finally, print out the final status of each citizen to identify who got richer or poorer
console.log("Final status of each citizen:");
population.forEach(citizen => {
  console.log(`${citizen.name}: $${citizen.money}`);
});
