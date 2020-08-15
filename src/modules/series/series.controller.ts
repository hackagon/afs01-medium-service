import { Crud } from "@nestjsx/crud";
import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { SeriesEntity } from './series.entity';
import { SeriesService } from './series.service';
import { CreateSeriesDTO, UpdateSeriesDTO, ReplaceSeriesDTO } from './series.dto';

@Crud({
  model: {
    type: SeriesEntity,
  },
  dto: {
    create: CreateSeriesDTO,
    update: UpdateSeriesDTO,
    replace: ReplaceSeriesDTO
  },
  routes: {
    deleteOneBase: {
      returnDeleted: true
    }
  }
})
@Controller("/series")
export class SeriesController {
  constructor(
    public service: SeriesService
  ) { }

  @Get("/:seriesId/stories")
  async getStoriesBySeriesId(
    @Param("seriesId", ParseIntPipe) seriesId: number
  ) {
    return this.service.getStoriesBySeriesId(seriesId)
  }
}