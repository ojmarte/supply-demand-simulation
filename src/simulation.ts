import { Citizen } from "./population";

const population: Citizen[] = Array(100).fill(null).map((_, idx) => new Citizen(`Citizen${idx + 1}`));
let pricePerHour = 10;

console.log(`Initial pricePerHour: ${pricePerHour}`)
// // Print initial values of each citizen
// console.log("Initial status of each citizen:");
// population.forEach(citizen => {
//   console.log(`${citizen.name}: $${citizen.money}`);
// });
// console.log('------------------------------------');

for (let i = 0; i < 10; i++) {
  population.forEach(citizen => {
    citizen.timeAvailable = 24;
  });
  const shuffledPopulation = [...population].sort(() => 0.5 - Math.random());

  // Filter those wanting to consume time based on their spendProbability and their available money
  const timeConsumers = shuffledPopulation.filter(citizen => Math.random() < citizen.spendProbability && citizen.money >= pricePerHour);

  const timeSellers = shuffledPopulation.filter(citizen => !timeConsumers.includes(citizen));

  timeConsumers.forEach(consumer => {
    const hoursWanted = Math.floor(Math.random() * 4) + 1; // or however you determine the hours a consumer wants
    
    for (const seller of timeSellers) {
        if (seller.timeAvailable >= hoursWanted && consumer.consumeTime(seller, hoursWanted, pricePerHour)) {
            seller.timeAvailable -= hoursWanted;
            break;
        }
    }
  });

  const demandSupplyRatio = timeConsumers.length / timeSellers.length;
  console.log(`demand suply ratio: ${demandSupplyRatio}`)
  if (demandSupplyRatio > 1) {
      pricePerHour *= (1 + demandSupplyRatio);  // Increase price in proportion to the excess demand
  } else {
      pricePerHour /= (1 + demandSupplyRatio);  // Decrease price inversely to the ratio
      pricePerHour = Math.max(1, pricePerHour);  // Ensure price doesn't drop below 1
  }
  
}

// Sort the population by money in descending order
const sortedPopulation = [...population].sort((a, b) => b.money - a.money);

// Calculate the total wealth
const totalWealth = sortedPopulation.reduce((sum, citizen) => sum + citizen.money, 0);

// Determine the smallest subset of the population that holds a given percentage of the wealth
const targetPercentageOfWealth = 0.8; // 80% as an example

let accumulatedWealth = 0;
let percentageOfPopulation = 0;

for (let i = 0; i < sortedPopulation.length; i++) {
    accumulatedWealth += sortedPopulation[i].money;
    if (accumulatedWealth >= targetPercentageOfWealth * totalWealth) {
        percentageOfPopulation = (i + 1) / sortedPopulation.length; // +1 because arrays are 0-indexed
        break;
    }
}

console.log(`${(percentageOfPopulation * 100).toFixed(2)}% of the population holds ${(targetPercentageOfWealth * 100)}% of the total wealth.`);
console.log(`Final pricePerHour: ${pricePerHour}`)
// Print final values of each citizen after 1000000 iterations
// console.log("Final status of each citizen after 1000000 iterations:");
// population.forEach(citizen => {
//   console.log(`${citizen.name}: $${citizen.money}`);
// });
