'use strict';

// Example of nested scopes. The inner scope can
// seamlessly access values existing on the outer scope.
const sample = function (x) {
    // Example of v being hoisted
    // What happens if we use let/const?
    console.log(v);
    var v = 10;
    console.log(v);
    const inner = function () {
        console.log(x);
    };
    inner();
    console.log(z);
};

// Global variable z is defined on sample’s inner scope
// because it is defined just before it is invoked – remember
// JS is lexically scoped
let z = 20;
sample(100);
