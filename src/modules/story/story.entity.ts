import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, ManyToMany, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { cleanAccents } from '../../utils/hanldeString';
import * as _ from "lodash";
import { StoryStatus } from './story.dto';
import { UserEntity } from '../user/user.entity';
import { ItemEntity } from '../item/item.entity';

@Entity({ name: "story" })
export class StoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // typeorm query builder
  @ManyToOne(type => UserEntity, user => user.stories, {
    onDelete: "SET NULL"
  })
  @JoinColumn({ name: "user_id" })
  userId: number;

  @Column()
  title: string; // Tìm hiểu về NodeJS 1=> /tim-hieu-ve-nodejs-phan-1-29329038902

  @Column({ name: "image_url", nullable: true })
  imageUrl: string;

  @Column()
  status: StoryStatus = StoryStatus.Draft
  // Draft, Published, Modified
  // Draft: CUD item => Draft
  // Published: CUD item => Modified
  // Modified: CUD item => Modified

  @Column()
  slug: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // relation
  @OneToMany(type => ItemEntity, item => item.storyId, {
    cascade: true
  })
  items: ItemEntity[]

  @BeforeInsert()
  @BeforeUpdate()
  generateSlugFromTitle() {
    this.slug = _.chain(this.title)
      .thru(title => cleanAccents(title))
      .toLower()
      .split(" ")
      .concat(Date.now().toString())
      .join("-")
      .value()
  }
}