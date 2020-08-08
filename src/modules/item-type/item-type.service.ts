import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemTypeRepository } from './item-type.repository';
import * as fs from 'fs';
import * as path from "path";
import * as _ from "lodash";
import * as BBPromise from "bluebird"
import { getConnection } from 'typeorm';
import { ItemTypeEntity } from './item-type.entity';

@Injectable()
export class ItemTypeService implements OnModuleInit {
  constructor(
    @InjectRepository(ItemTypeRepository) private itemTypeRepo: ItemTypeRepository
  ) { }

  async onModuleInit() {
    const sqlPath = path.join(
      __dirname,
      "../../../../script/insert_item_type.sql"
    )

    const queries = _.chain(sqlPath)
      .thru(value => {
        return fs.readFileSync(value, { encoding: "utf8" }).toString()
      })
      .replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
      .replace(/\s+/g, ' ') // excess white space
      .split(";")
      .filter()
      .value()

    // map + Promise.all
    await BBPromise.map(queries, (query: string) => getConnection().query(query))
  }

  async getItemTypes(): Promise<ItemTypeEntity[]> {
    return await this.itemTypeRepo.find()
  }
}