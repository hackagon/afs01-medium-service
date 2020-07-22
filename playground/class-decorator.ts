/**
 * class-decorator
 * La mot function
 * function nay co tham so la constructor cua mot class
 */

function SelfDriving(constructorFunction: Function) {
  console.log("Class Decorator")
  constructorFunction.prototype.selfDrivable = true;
}

@SelfDriving
class Car {
  public selfDrivable: boolean
  public name: string;
  constructor(name: string) {
    console.log("Initialize car instance")
    this.name = name;
  }
}

// const tesla = new Car("Tesla")
// console.log("Tesla: ", tesla.selfDrivable)