import { InjectRepository } from "@nestjs/typeorm"
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import * as _ from "lodash";
import { StoryEntity } from "../story/story.entity";
import { Connection } from "typeorm";
import * as path from "path";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    private connection: Connection
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

  async getStoriesByUsers(): Promise<any[]> {
    const users = await this.connection
      .getRepository(UserEntity)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.stories", "story")
      .getMany()

    return users;
  }

  async getStoriesByUserId(id: number): Promise<any> {
    const user = await this.connection
      .getRepository(UserEntity)
      .createQueryBuilder("user")
      .where({ id })
      .leftJoinAndSelect("user.stories", "story")
      .select(["story.title", "user"])
      .getOne()

    return user;
  }

  async _getStoriesByUserId(id: number): Promise<any> {
    const sqlQuery = `
      SELECT
        *
      FROM
        USER LEFT JOIN story ON USER.id = story.user_id 
      WHERE
        USER.id = ${id};
    `
    // const sqlPath = path.join(__dirname, "/../../../../script/query_stories_by_user.sql")
    // const compiled = _.template(require(sqlPath))
    // console.log("compiled", compiled)
    // const sqlQuery = compiled({ user_id: id })
    // console.log(sqlQuery)

    const sqlRecords = await this.connection.query(sqlQuery);

    const user = _.pick(
      _.first(sqlRecords),
      ["user_id", "email", "user_type"]
    )

    const stories = _.chain(sqlRecords)
      .map(record => {
        return _.pick(record, ["id", "title", "image_url", "slug", "status"])
      })
      .value()

    return _.assign(user, { stories })
  }
}