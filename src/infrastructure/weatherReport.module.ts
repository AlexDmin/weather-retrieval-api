import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WeatherReportController } from '@src/adapter/weatherReport.controller';
import { EnvConfigService } from './services/config.service';
import { EXCEPTIONS_SERVICE, WeatherReportAPICliService } from './services/weatherReport.apicli.service';
import { GetWeatherReportByCoordinatesUseCase, WEATHER_REPORT_SERVICE } from '@src/application/usecases/getWeatherReportByCoordinates.usecase';
import { ExceptionsService } from './services/exceptions.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [WeatherReportController],
  providers: [
    EnvConfigService,
    WeatherReportAPICliService,
    ExceptionsService,
    {
      provide: WEATHER_REPORT_SERVICE,
      useExisting: WeatherReportAPICliService
    },
    {
      provide: EXCEPTIONS_SERVICE,
      useExisting: ExceptionsService
    },
    GetWeatherReportByCoordinatesUseCase
  ],
})

export class WeatherReportModule {}
