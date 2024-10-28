import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfig } from '@src/domain/config/config';

@Injectable()
export class EnvConfigService implements AppConfig {
  public weatherAPIBaseURL: string;
  public weatherAPIKey: string;

  constructor(private configService: ConfigService) {
    this.weatherAPIBaseURL = this.configService.get<string>(
      'WEATHER_API_BASE_URL',
    );
    this.weatherAPIKey = this.configService.get<string>('WEATHER_API_KEY');
  }

  getWeatherAPIBaseURL(): string {
    return this.weatherAPIBaseURL;
  }

  getWeatherAPIKey(): string {
    return this.weatherAPIKey;
  }
}
