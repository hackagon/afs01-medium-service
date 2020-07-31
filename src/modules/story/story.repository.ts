import { EntityRepository, Repository } from "typeorm";
import { StoryEntity } from './story.entity';

@EntityRepository(StoryEntity)
export class StoryRepository extends Repository<StoryEntity> { }