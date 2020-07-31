import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDTO } from './user.dto';

@Controller("/users")
export class UserController {
  constructor(
    private userService: UserService
  ) { }

  @Get()
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.getUsers()
  }

  // relation
  @Get("/stories")
  async getStoriesByUsers(): Promise<any[]> {
    return await this.userService.getStoriesByUsers()
  }

  @Get("/:id/stories")
  async getStoriesByUserId(@Param("id") id: number) {
    return await this.userService.getStoriesByUserId(id)
  }

  @Get("/:id/_stories")
  async _getStoriesByUserId(@Param("id") id: number) {
    return await this.userService._getStoriesByUserId(id)
  }

  @Get("/:id")
  async getUserById(@Param("id") id: number) {
    return await this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() data: CreateUserDTO): Promise<UserEntity> {
    return await this.userService.createUser(data);
  }

  @Delete("/:id")
  async deleteUserById(@Param("id") id: number) {
    return await this.userService.deleteUserById(id);
  }
}