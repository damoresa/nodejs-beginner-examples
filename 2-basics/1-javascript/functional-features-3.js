'use strict';

// Usual factorial implementation
const _factorial = (n, prod = 1) => {
    return n === 0
        ? prod
        : _factorial(n - 1, prod * n);
}

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
// The trampolined factorial will not exceed the maximum call stack size
// The usual recursive approach will indeed cause the stack to overflow and trigger an error
const factorial = trampoline(fact);
console.log(factorial(20000));
console.log(_factorial(20000));
