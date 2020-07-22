function Wheels(number: number) {
  return function (constructorFunction: Function) {
    console.log("Class Decorator");
    constructorFunction.prototype.wheels = number;
  }
}

@Wheels(4)
class Vehicle {
  wheels: number;
  name: string;
  constructor(name: string) {
    this.name = name
  }
}

const car = new Vehicle("Car");
console.log(car.wheels)