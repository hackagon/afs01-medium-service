import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: "series_story"
})
export class SeriesStoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "series_id" })
  seriesId: number;

  @Column({ name: "story_id" })
  storyId: number;

  @Column({ name: "display_index" })
  displayIndex: number = 0;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

// Them story (co san) vao series
// router: /series/id/add-story
// router: POST /series-stories


// Xoa story tu series (khong delete luon bai viet, cho xoa record trong bang trung gian)
// router: DELETE /series-stories