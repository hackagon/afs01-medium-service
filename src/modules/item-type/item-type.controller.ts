import { Controller, Get } from "@nestjs/common";
import { ItemTypeService } from './item-type.service';
import { ItemTypeEntity } from "./item-type.entity";

@Controller("/item-types")
export class ItemTypeController {
  constructor(
    private itemTypeService: ItemTypeService
  ) { }

  @Get()
  async getItemTypes(): Promise<ItemTypeEntity[]> {
    return await this.itemTypeService.getItemTypes();
  }
}