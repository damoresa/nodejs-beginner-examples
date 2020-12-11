'use strict';

// IIFEs were used to keep variables in certain scopes secret or
// short-lived. However, there’s better techniques now.
// Try this code replacing var with let or const
const sample = function (x) {
    if (x > 20) {
        var weight = x * 10;
        console.log(`Weight is ${weight}`);
    }
    console.log(`Outter weight ${weight}`);
};
sample(25);

// IIFE stands for Immediately Invoked Function Expression and
// is defined as shown below.
(function () {
    // Your scoped code
    console.log('This is an scoped execution');
}());
