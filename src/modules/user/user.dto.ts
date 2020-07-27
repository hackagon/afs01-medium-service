import { IsNotEmpty, IsEmail, IsEmpty, Validate } from "class-validator"
import { IsUniqueEmail } from '../validator/isUniqueEmail';

export enum UserType {
  Member = "Member",
  Admin = "Admin"
}

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @Validate(IsUniqueEmail, { message: "This email already exist" })
  email: string;

  @IsEmpty()
  userType: UserType
}