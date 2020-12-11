'use strict';

// Create an object instance which has properties and “methods”
const obj = {
    a: 2,
    sum: function () {
        return this.a + 1;
    }
};

// Invoke the method and see the result
console.log(obj.sum());

// By using Object.create we can extend the base object
const secondObj = Object.create(obj);

// We can also override properties or methods by creating local properties
secondObj.a = 4;
console.log(secondObj.sum());

delete secondObj.a;
console.log(secondObj.sum());
