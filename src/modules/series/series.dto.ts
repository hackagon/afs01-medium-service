import { IsNotEmpty, IsEmpty } from 'class-validator';

export enum SeriesStatus {
  Draft = "Draft",
  Published = "Published",
  Modified = "Modified"
}

export class CreateSeriesDTO {
  @IsNotEmpty()
  userId: number

  @IsNotEmpty()
  title: string

  imageUrl: string;
  description: string;
}

export class UpdateSeriesDTO {
  @IsEmpty()
  userId: number

  @IsNotEmpty()
  title: string

  imageUrl: string;
  description: string;
}

export class ReplaceSeriesDTO {
  @IsEmpty()
  userId: number

  @IsNotEmpty()
  title: string

  imageUrl: string;
  description: string;
}