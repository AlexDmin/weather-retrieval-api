import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';

import { WeatherReport } from '@src/domain/models/weatherReport';
import { WeatherReportServiceI } from '@src/domain/services/weatherReport.service';
import { Coordinates } from '@src/domain/models/coordinates';
import { WeatherReportMapper } from '../mappers/weatherReport.mapper';
import { WeatherReportDTO } from '../dtos/weatherReport.dto';
import { EnvConfigService } from './config.service';
import { ExceptionsServiceI } from '@src/domain/services/exceptions.service';

export const EXCEPTIONS_SERVICE = 'exceptionsService';

@Injectable()
export class WeatherReportAPICliService implements WeatherReportServiceI {
  private readonly weatherApiBaseUrl: string;

  private readonly weatherApiKey: string;

  private readonly exceptionsService: ExceptionsServiceI;

  constructor(config: EnvConfigService, @Inject(EXCEPTIONS_SERVICE) exceptionsService: ExceptionsServiceI) {
    this.weatherApiBaseUrl = config.getWeatherAPIBaseURL();
    this.weatherApiKey = config.getWeatherAPIKey();
    this.exceptionsService = exceptionsService;
  }

  async getWeatherByCoordinates(
    coordinates: Coordinates,
  ): Promise<WeatherReport> {
    try {
      const { data } = await axios.get<WeatherReportDTO>(
        `${this.weatherApiBaseUrl}/data/2.5/weather`,
        {
          params: {
            lat: coordinates.latitude,
            lon: coordinates.longitude,
            appid: this.weatherApiKey,
          },
        },
      );
      const weatherReport = WeatherReportMapper.fromDTOToModel(data);
      return weatherReport;
    } catch (error) {
      this.exceptionsService.internalServerErrorException();
    }
  }
}
