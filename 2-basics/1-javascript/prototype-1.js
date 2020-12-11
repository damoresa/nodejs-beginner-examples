'use strict';

// Create an object prototype and an instance
const SampleObject = function () {
    this.a = 100;
    this.b = 50;
};
const instance = new SampleObject();

// Properties can be added dynamically
SampleObject.prototype.c = 75;
SampleObject.prototype.d = 25;

// Objects are sort of dynamic property bags
// When a property is accessed, it's searched in the object
// and it's parents until it's found or no prototypes remain
// in the chain
console.log(instance);
console.log(instance.c);

// We can use hasOwnProperty to detect prototype inherited properties
console.log(instance.hasOwnProperty('a'));
console.log(instance.hasOwnProperty('c'));
console.log(instance.hasOwnProperty('d'));

