import { EntityRepository, Repository } from "typeorm";
import { SeriesStoryEntity } from './series-story.entity';

@EntityRepository(SeriesStoryEntity)
export class SeriesStoryRepository extends Repository<SeriesStoryEntity>{ }