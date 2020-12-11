'use strict';

// Define a filter function
const oddsFilter = (x) => {
    return x % 2 === 0;
};
// Generate a base array of numbers
const numbers = Array(100).fill(0).map((n, idx) => idx + 1);

// Apply the filter function
const evens = numbers.filter(oddsFilter);
console.log(evens);

// Generate the array values sum
const sum = numbers.reduce((aggr, curr) => {
    return aggr + curr;
}, 0);

console.log(`First ${numbers.length} evens sum is ${sum}.`);
