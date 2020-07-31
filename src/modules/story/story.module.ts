import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StoryRepository } from './story.repository';
import { StoryService } from './story.service';
import { StoryController } from "./story.controller";

@Module({
  imports: [TypeOrmModule.forFeature([StoryRepository])],
  providers: [StoryService],
  controllers: [StoryController]
})
export class StoryModule { }