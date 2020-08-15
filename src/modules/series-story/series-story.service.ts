import { Injectable } from "@nestjs/common";
import { CreateSeriesStoryDTO } from './series-story.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { SeriesStoryEntity } from './series-story.entity';
import { SeriesStoryRepository } from './series-story.repository';

@Injectable()
export class SeriesStoryService {
  constructor(
    @InjectRepository(SeriesStoryRepository) private seriesStoryRepo: SeriesStoryRepository
  ) { }


  // them story vao mot series
  async createSeriesStory(data: CreateSeriesStoryDTO): Promise<SeriesStoryEntity> {
    // auto generate display_index
    return await this.seriesStoryRepo.create(data).save()
  }

  async deleteSeriesStory(seriesId: number, storyId: number): Promise<SeriesStoryEntity> {
    const foundSeriesStory = await this.seriesStoryRepo.findOne({
      where: {
        seriesId, storyId
      }
    })

    await foundSeriesStory.remove()

    return foundSeriesStory
  }
}