import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemRepository } from './item.repository';
import { ItemEntity } from './item.entity';
import { CreateItemDTO } from './item.dto';
import * as _ from "lodash";
import * as BBPromise from "bluebird";

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemRepository)
    private itemRepo: ItemRepository
  ) { }

  async getItemsByStoryId(storyId: number): Promise<ItemEntity[]> {
    return await this.itemRepo.find({
      storyId
    })
  }

  async createItem(storyId: number, data: CreateItemDTO) {
    const displayIndex = (await this.getItemsByStoryId(storyId)).length;
    const newItem = this.itemRepo.create({
      ...data,
      storyId,
      displayIndex
    })
    await newItem.save()

    return newItem
  }

  async moveItemPositions(storyId: number, data: any): Promise<any> {
    const newItemPositions = _.get(data, "items", []);

    // for (const itemPosition of newItemPositions) {
    //   const foundItem = await this.itemRepo.findOne(itemPosition.id)
    //   foundItem.displayIndex = itemPosition.displayIndex
    //   await foundItem.save()
    // }

    const items = await this.itemRepo.find({ storyId });
    return BBPromise.map(items, item => {
      const itemPosition = _.find(newItemPositions, itemPosition => {
        return itemPosition.id === item.id
      })
      item.displayIndex = itemPosition.displayIndex

      return item.save()
    })
      .then(res => {
        return {
          message: "Update position successfully",
          items: _.map(res, item => _.pick(item, ["id", "displayIndex"]))
        }
      })
      .catch(err => err)
  }


}