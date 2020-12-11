'use strict';

// Define the sample function
const isEven = (data) => {
    return new Promise((resolve, reject) => {
        if (!isNaN(data) && data % 2 === 0) {
            resolve(`${data}: is even`);
        } else {
            reject(`${data}: is either not a number or odd.`);
        }
    });
};

// Invoke the sample function
isEven(4)
    .then(console.log)
    .catch(console.error);

isEven(5)
    .then(console.log)
    .catch(console.error);
