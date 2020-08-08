import { IsNotEmpty, IsEmpty } from 'class-validator';
export class CreateItemDTO {
  @IsNotEmpty()
  storyId: number;

  @IsNotEmpty()
  itemTypeId: number;

  content: string;
}

export class UpdateItemDTO {
  @IsEmpty()
  storyId: number;

  @IsEmpty()
  itemTypeId: number;

  content: string;
}