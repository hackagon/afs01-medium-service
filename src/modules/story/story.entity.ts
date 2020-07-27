import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: "story" })
export class StoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id" })
  userId: number;

  @Column()
  title: string; // Tim hieu ve NodeJS => /tim-hieu-ve-nodejs-29329038902

  @Column({ name: "image_url", nullable: true })
  imageUrl: string;

  @Column()
  status: string = "Draft"

  @Column()
  slug: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}