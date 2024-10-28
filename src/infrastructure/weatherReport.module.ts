import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WeatherReportController } from '@src/adapter/weatherReport.controller';
import { EnvConfigService } from './services/config.service';
import { WeatherReportAPICliService } from './services/weatherReport.apicli.service';
import { GetWeatherReportByCoordinatesUseCase } from '@src/application/usecases/getWeatherReportByCoordinates.usecase';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [WeatherReportController],
  providers: [
    EnvConfigService,
    WeatherReportAPICliService,
    {
      provide: 'weatherReportService',
      useExisting: WeatherReportAPICliService
    },
    GetWeatherReportByCoordinatesUseCase
  ],
})

export class WeatherReportModule {}
