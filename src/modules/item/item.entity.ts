import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, getConnection, BeforeInsert, BeforeUpdate, BeforeRemove } from 'typeorm';
import { StoryEntity } from '../story/story.entity';
import { StoryStatus } from '../story/story.dto';

@Entity({
  name: "item"
})
export class ItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => StoryEntity, story => story.items, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "story_id" })
  storyId: number;

  @Column({ name: "item_type_id" })
  itemTypeId: number;

  @Column({})
  content: string;

  @Column({ name: "display_index" })
  displayIndex: number;

  @CreateDateColumn({
    name: "created_at"
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at"
  })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  @BeforeRemove()
  async updateStoryStatus() {
    const story = await getConnection()
      .getRepository(StoryEntity)
      .findOne(this.storyId);

    let status: StoryStatus;
    switch (story.status) {
      case StoryStatus.Draft:
        status = StoryStatus.Draft
        break;

      case StoryStatus.Published:
        status = StoryStatus.Modified
        break;

      case StoryStatus.Modified:
        status = StoryStatus.Modified
        break;
    }

    story.status = status;
    await story.save()
  }
}