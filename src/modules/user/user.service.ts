import { InjectRepository } from "@nestjs/typeorm"
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import * as _ from "lodash";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository
  ) { }

  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepo.find()
  }

  async getUserById(id: number): Promise<UserEntity> {
    const foundUser = await this.userRepo.findOne(id)
    if (!foundUser) throw new NotFoundException("User not found")
    return foundUser;
  }

  async createUser(data: CreateUserDTO): Promise<UserEntity> { // email
    const newUser = this.userRepo.create(_.omit(data, ["userType"]))
    await newUser.save()
    return newUser
  }

  async deleteUserById(id: number): Promise<UserEntity> {
    const foundUser = await this.getUserById(id)

    await this.userRepo.delete(id);
    return foundUser
  }
}