import { Inject } from '@nestjs/common';
import { Coordinates } from '@src/domain/models/coordinates';
import { WeatherReport } from '@src/domain/models/weatherReport';
import { WeatherReportServiceI } from '@src/domain/services/weatherReport.service';

export class GetWeatherReportByCoordinatesUseCase {
  constructor(
    @Inject('weatherReportService') private readonly weatherReportService: WeatherReportServiceI,
  ) {}

  public async execute(params: Coordinates): Promise<WeatherReport> {
    const weatherReport =
      await this.weatherReportService.getWeatherByCoordinates(params);
    return weatherReport;
  }
}
