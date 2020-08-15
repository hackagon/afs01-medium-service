import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeriesEntity } from './series.entity';
import { SeriesService } from './series.service';
import { SeriesController } from "./series.controller";
import { SeriesStoryRepository } from '../series-story/series-story.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeriesEntity, SeriesStoryRepository])
  ],
  providers: [SeriesService],
  controllers: [SeriesController]
})
export class SeriesModule { }