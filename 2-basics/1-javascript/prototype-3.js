'use strict';

// Using the class keyword
class Polygon {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}

// Inheritance can be done with the extends keyword
class Square extends Polygon {
    constructor(sideLength) {
        super(sideLength, sideLength);
    }

    get area() {
        return this.height * this.width;
    }
}

const square = new Square(2);
console.log(square.area);
