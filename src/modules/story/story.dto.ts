import { IsNotEmpty, IsEmpty } from 'class-validator';

export enum StoryStatus {
  Draft = "Draft",
  Published = "Published",
  Modified = "Modified"
}

export class CreateStoryDTO {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  title: string;

  imageUrl: string;
}

export class ReplaceStoryDTO {
  @IsEmpty()
  userId: number;

  @IsNotEmpty()
  title: string;

  imageUrl: string
}

export class UpdateStoryDTO {
  @IsEmpty()
  userId: number;

  @IsNotEmpty()
  title: string;

  imageUrl: string
}