import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator"
import { getManager } from "typeorm"
import { UserEntity } from '../user/user.entity';

@ValidatorConstraint({ async: true })
export class IsUniqueEmail implements ValidatorConstraintInterface {
  async validate(email: string): Promise<boolean> {
    const entityManager = getManager();
    const foundUser = await entityManager.findOne(UserEntity, { email })
    return foundUser ? false : true
  }
}