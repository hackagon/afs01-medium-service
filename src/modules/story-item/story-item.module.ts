import { Module } from "@nestjs/common";
import { ItemService } from '../item/item.service';
import { StoryItemController } from './story-item.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemRepository } from '../item/item.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemRepository])
  ],
  providers: [ItemService],
  controllers: [StoryItemController]
})
export class StoryItemModule { }