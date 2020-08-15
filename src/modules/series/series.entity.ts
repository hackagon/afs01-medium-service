import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn } from 'typeorm';
import * as _ from "lodash";
import { cleanAccents } from '../../utils/hanldeString';
import { SeriesStatus } from './series.dto';
import { UserEntity } from '../user/user.entity';

@Entity({ name: "series" })
export class SeriesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => UserEntity, user => user.series, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "user_id" })
  userId: number;

  @Column()
  title: string;

  @Column()
  description: string = ""

  @Column({ name: "image_url", nullable: true })
  imageUrl: string;

  @Column()
  status: string = SeriesStatus.Draft;

  @Column()
  slug: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

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