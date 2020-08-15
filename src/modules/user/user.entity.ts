import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from "typeorm";
import { UserType } from './user.dto';
import { StoryEntity } from '../story/story.entity';
import { SeriesEntity } from '../series/series.entity';

// decorator

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column({ name: "user_type" })
  userType: UserType = UserType.Member;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // relation
  @OneToMany(type => StoryEntity, story => story.userId, {
    cascade: true
  })
  stories: StoryEntity[]

  @OneToMany(type => SeriesEntity, series => series.userId, {
    cascade: true
  })
  series: SeriesEntity[]
}