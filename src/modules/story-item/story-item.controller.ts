import { Controller, Get, Param, Post, Body, Patch, ParseIntPipe } from "@nestjs/common";
import { ItemService } from '../item/item.service';
import { ItemEntity } from '../item/item.entity';
import { CreateItemDTO } from '../item/item.dto';

@Controller("/stories")
export class StoryItemController {
  constructor(
    private itemService: ItemService
  ) { }

  @Get("/:id/items")
  async getItemsByStoryId(
    @Param("id") storyId: number
  ): Promise<ItemEntity[]> {
    return await this.itemService.getItemsByStoryId(storyId)
  }

  @Post("/:id/items")
  async createItem(
    @Param("id", ParseIntPipe) storyId: number,
    @Body() data: any
  ) {
    return await this.itemService.createItem(storyId, data);
  }

  @Patch("/:id/move_item_positions")
  async moveItemPositions(
    @Param("id") storyId: number,
    @Body() data: any
  ) {
    return await this.itemService.moveItemPositions(storyId, data)
  }
}