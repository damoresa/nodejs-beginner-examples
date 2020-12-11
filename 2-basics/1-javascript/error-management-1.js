'use strict';

const sampleFn = function (x) {
    if (isNaN(x)) {
        // Generate and throw an error
        throw new Error(`Invalid parameter ${x}`);
    } else {
        return x * 2;
    }
};

// Traditional error management via try/catch blocks
try {
    console.log(sampleFn(2));
    console.log(sampleFn('2'));
    console.log(sampleFn('asd'));
} catch (err) {
    console.error('Something went wrong!', err);
}
