import { Controller, Get, Query } from '@nestjs/common';

import { WeatherReport } from '@src/domain/models/weatherReport';
import { Coordinates } from '@src/domain/models/coordinates';
import { CoordinatesDTO } from '../infrastructure/dtos/coordinates.dto';
import { CoordinatesMapper } from '../infrastructure/mappers/coordinates.mapper';
import { GetWeatherReportByCoordinatesUseCase } from '@src/application/usecases/getWeatherReportByCoordinates.usecase';

@Controller('api/weather')
export class WeatherReportController {
  constructor(
    private getWeatherReportByCoordinatesUseCase: GetWeatherReportByCoordinatesUseCase,
  ) {}

  @Get()
  async getAll(@Query() query: CoordinatesDTO): Promise<WeatherReport> {
    const coordinates: Coordinates = CoordinatesMapper.fromDTOToModel(query);
    return this.getWeatherReportByCoordinatesUseCase.execute(coordinates);
  }
}
