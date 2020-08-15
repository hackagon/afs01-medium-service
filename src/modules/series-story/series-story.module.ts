import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeriesStoryRepository } from './series-story.repository';
import { SeriesStoryService } from './series-story.service';
import { SeriesStoryController } from './series-story.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeriesStoryRepository])
  ],
  providers: [SeriesStoryService],
  controllers: [SeriesStoryController]
})
export class SeriesStoryModule { }