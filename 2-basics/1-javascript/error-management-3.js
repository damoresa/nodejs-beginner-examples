'use strict';

// Implement a function with asynchronous behavior via a promise
const sampleFn = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Sample error!');
        }, 2000);
    });
};

// Invoke the function and subscribe to the promise results
sampleFn()
    .then(console.log)
    .catch(console.error);

// We will use async/await on a later sample
