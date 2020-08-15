import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { SeriesEntity } from './series.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SeriesStoryRepository } from '../series-story/series-story.repository';

@Injectable()
export class SeriesService extends TypeOrmCrudService<SeriesEntity> {
  constructor(
    @InjectRepository(SeriesEntity) repo: Repository<SeriesEntity>,
    @InjectRepository(SeriesStoryRepository) private seriesStoryRepo: SeriesStoryRepository
  ) {
    super(repo);
  }

  async getStoriesBySeriesId(seriesId: number) {
    // join table => query lay them cac thong tin cua story do
    return await this.seriesStoryRepo.find({
      seriesId
    })
  }
}