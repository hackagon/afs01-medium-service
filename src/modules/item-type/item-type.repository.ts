import { EntityRepository, Repository } from "typeorm";
import { ItemTypeEntity } from './item-type.entity';

@EntityRepository(ItemTypeEntity)
export class ItemTypeRepository extends Repository<ItemTypeEntity> { };