/**
 * Method decorator cung la mot function co cac tham so:
 * @target
 * @propertyKey
 * @descriptor
 */

function MinimumFuel(fuel: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      console.log(this.fuel, fuel)
      if (this.fuel > fuel) {
        // apply, call
        originalMethod.apply(this, args);
      } else {
        console.log("Not enough fuel!")
      }
    }
  }
}

class Rocket {
  fuel = 50;

  @MinimumFuel(100)
  launchToMars() {
    console.log("Launching to Mars")
  };

  @MinimumFuel(30)
  launchToMoon() {
    console.log("Launching to Moon")
    this.fuel = this.fuel - 30;
  }
}

const rocket = new Rocket();
// rocket.launchToMars()
rocket.launchToMoon()
rocket.launchToMoon()