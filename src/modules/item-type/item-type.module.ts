import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemTypeRepository } from './item-type.repository';
import { ItemTypeService } from './item-type.service';
import { ItemTypeController } from "./item-type.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemTypeRepository]),
  ],
  providers: [ItemTypeService],
  controllers: [ItemTypeController]
})
export class ItemTypeModule { }