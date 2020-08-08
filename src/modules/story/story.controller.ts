import { Controller, Get, Post, Body, Param, Patch, Put, Delete, ParseIntPipe } from "@nestjs/common";
import { StoryService } from './story.service';
import { StoryEntity } from "./story.entity";
import { CreateStoryDTO, UpdateStoryDTO, ReplaceStoryDTO } from './story.dto';

@Controller("/stories")
export class StoryController {
  constructor(
    private storyService: StoryService
  ) { }

  @Get()
  async getStories(): Promise<StoryEntity[]> {
    return await this.storyService.getStories();
  }

  @Post()
  async createStory(@Body() data: CreateStoryDTO): Promise<StoryEntity> {
    return await this.storyService.createStory(data)
  }

  @Get("/:id")
  async getStoryById(@Param("id") id: number): Promise<StoryEntity> {
    return await this.storyService.getStoryById(id)
  }

  @Patch("/:id")
  async updateStoryById(@Param("id") id: number, @Body() data: UpdateStoryDTO): Promise<StoryEntity> {
    return await this.storyService.updateStoryById(id, data)
  }

  @Patch("/:id/publish")
  async publishStory(
    @Param("id", ParseIntPipe) storyId: number
  ) {
    return await this.storyService.publishStatus(storyId);
  }

  @Put("/:id")
  async replaceStoryById(
    @Param("id") id: number,
    @Body() data: ReplaceStoryDTO
  ): Promise<StoryEntity> {
    return await this.storyService.replaceStoryById(id, data)
  }

  @Delete("/:id")
  async deleteStoryById(
    @Param("id") id: number
  ) {
    return await this.storyService.deleteStoryById(id)
  }
}