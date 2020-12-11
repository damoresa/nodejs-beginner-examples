'use strict';

// Base factorial function
const fact = (n, prod = 1) => {
    return n === 0
        ? prod
        : () => {
            return fact(n - 1, prod * n);
        }
};

// Trampoline function
const trampoline = (fn) => (...args) => {
    let result = fn(...args);
    while (typeof result === 'function') {
        result = result();
        console.log('Partial', result);
    }
    return result;
};

// Wrap the factorial into the trampoline
const resultFn = trampoline(fact);
console.log(resultFn(2000));
