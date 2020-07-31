import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StoryRepository } from './story.repository';
import { StoryEntity } from './story.entity';
import { CreateStoryDTO, UpdateStoryDTO, ReplaceStoryDTO } from './story.dto';
import * as _ from "lodash"

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(StoryRepository) private storyRepo: StoryRepository
  ) { }

  async getStories(): Promise<StoryEntity[]> {
    return await this.storyRepo.find();
  }

  async createStory(data: CreateStoryDTO): Promise<StoryEntity> {
    return await this.storyRepo.create(data).save()
  }

  async getStoryById(id: number) {
    const foundStory = await this.storyRepo.findOne(id)
    if (!foundStory) throw new NotFoundException("Story not found")
    return foundStory;
  }

  async updateStoryById(id: number, data: UpdateStoryDTO): Promise<StoryEntity> {
    let foundStory = await this.getStoryById(id);

    foundStory = _.assign(foundStory, data)
    await foundStory.save()
    return foundStory;
  }

  async replaceStoryById(id: number, data: ReplaceStoryDTO): Promise<StoryEntity> {
    let foundStory = await this.getStoryById(id);
    _.chain(["title", "imageUrl"])
      .value()
      .forEach(key => foundStory[key] = data[key])

    await foundStory.save()
    return foundStory;
  }

  async deleteStoryById(id: number): Promise<StoryEntity> {
    const foundStory = await this.getStoryById(id);
    this.storyRepo.delete(id)
    return foundStory
  }
}