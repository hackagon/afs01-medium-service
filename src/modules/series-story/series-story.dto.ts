import { IsNotEmpty } from "class-validator";

export class CreateSeriesStoryDTO {
  @IsNotEmpty()
  // viet decorator check xem seriesId co ton tai hay ko (@IsExist)
  seriesId: number;

  @IsNotEmpty()
  // viet decorator check xem storyId co ton tai hay ko (@IsExist)
  storyId: number;
}