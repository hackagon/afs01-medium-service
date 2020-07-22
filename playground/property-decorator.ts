// reflect-metadata

// logic validation
class Validator {
  static keys: Array<string> = []
  static positiveMap: Map<any, string[]> = new Map();

  static registerPositiveMap(target: any, propertyKey: string): void {
    this.keys.push(propertyKey)
    this.positiveMap.set(target, this.keys)
  }

  static validate(target: any) {
    let positiveProps: string[] = this.positiveMap.get(Object.getPrototypeOf(target))
    if (!positiveProps) return true;

    const errors = []
    for (const propertyKey of positiveProps) {
      const value = target[propertyKey];
      if (value <= 0) {
        errors.push(`${propertyKey} is not positive`)
      }
    }

    if (errors.length > 0) return errors.join(", ")
    return true;
  }
}


/**
 * property decorator
 * ban chat cung la mot function
 * function co 2 tham so
 * @target => Class
 * @propertyKey => ten cua key
 */
function IsPositive(target: any, propertyKey: string) {
  Validator.registerPositiveMap(target, propertyKey)
};

class Motor {
  @IsPositive
  velocity: number;

  @IsPositive
  acceleration: number;

  constructor(velocity: number, acceleration: number) {
    this.velocity = velocity;
    this.acceleration = acceleration;
  }
}

const motor_1 = new Motor(-10, -20);
console.log(Validator.validate(motor_1))