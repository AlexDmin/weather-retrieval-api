import { Injectable } from '@nestjs/common';

import { WeatherReport } from '@src/domain/models/weatherReport';
import { WeatherReportServiceI } from '@src/domain/services/weatherReport.service';
import { MOCKED_WEATHER_REPORT } from '@src/domain/data/weatherReport.mocked';

@Injectable()
export class WeatherReportMockedService implements WeatherReportServiceI {
  async getWeatherByCoordinates(): Promise<WeatherReport> {
    return MOCKED_WEATHER_REPORT;
  }
}
