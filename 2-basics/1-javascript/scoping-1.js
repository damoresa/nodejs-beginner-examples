'use strict';

// This function causes a ReferenceError because it’s
// using strict mode and y has not been defined
const scoped = function () {
    'use strict';
    try {
        y = 1;
        console.log(y);
    } catch (err) {
        console.error(err);
    }
};
scoped();

// The following example shadows the x variable.
// Changes will not be reflected on the outer scope.
const x = 100;
const sample = function () {
    let x = 50;
    x -= 25;
    console.log(x);
};
sample();
console.log(x);
