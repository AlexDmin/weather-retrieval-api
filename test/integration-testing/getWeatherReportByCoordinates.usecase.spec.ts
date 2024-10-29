import { Test } from '@nestjs/testing';

import { EXCEPTIONS_SERVICE, WeatherReportAPICliService } from '@src/infrastructure/services/weatherReport.apicli.service';
import { GetWeatherReportByCoordinatesUseCase, WEATHER_REPORT_SERVICE } from '@src/application/usecases/getWeatherReportByCoordinates.usecase';
import { ConfigModule } from '@nestjs/config';
import { WeatherReportController } from '@src/adapter/weatherReport.controller';
import { EnvConfigService } from '@src/infrastructure/services/config.service';
import { WeatherReport } from '@src/domain/models/weatherReport';
import { ExceptionsService } from '@src/infrastructure/services/exceptions.service';

describe('GetWeatherReportByCoordinatesUseCase', () => {
  let getWeatherReportByCoordinatesUseCase: GetWeatherReportByCoordinatesUseCase;
  let controller: WeatherReportController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
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
      }).compile();

      getWeatherReportByCoordinatesUseCase = moduleRef.get(GetWeatherReportByCoordinatesUseCase);
      controller = moduleRef.get(WeatherReportController);
  });

  describe('getWeather', () => {
    it('should return the weather data', async () => {
      let err = null;
      let weather: WeatherReport | null;

      try{
        weather = await getWeatherReportByCoordinatesUseCase.execute({
          latitude: 1,
          longitude: 1,
        });

      }catch(error){
        err = error;
      } 
      
      expect(err).toBeNull();
      expect(weather).not.toBeNull();
      expect(weather.humidityPercentage).not.toBeNull();
    });
  });
});
