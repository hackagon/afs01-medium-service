import { Controller, Body, Post, Delete, Param } from "@nestjs/common";
import { SeriesStoryService } from './series-story.service';
import { CreateSeriesStoryDTO } from './series-story.dto';
import { SeriesStoryEntity } from "./series-story.entity";

@Controller("/series-stories")
export class SeriesStoryController {
  constructor(
    private seriesStoryService: SeriesStoryService
  ) { }

  @Post()
  async createSeriesStory(
    @Body() data: CreateSeriesStoryDTO
  ): Promise<SeriesStoryEntity> {
    return await this.seriesStoryService.createSeriesStory(data)
  }

  @Delete("/:seriesId/:storyId")
  async deleteSeriesStory(
    @Param("seriesId") seriesId: number,
    @Param("storyId") storyId: number,
  ): Promise<SeriesStoryEntity> {
    return await this.seriesStoryService.deleteSeriesStory(seriesId, storyId)
  }
}