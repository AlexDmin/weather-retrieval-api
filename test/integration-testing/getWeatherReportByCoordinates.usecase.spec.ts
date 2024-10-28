import { Test } from '@nestjs/testing';

import { WeatherReportAPICliService } from '@src/infrastructure/services/weatherReport.apicli.service';
import { GetWeatherReportByCoordinatesUseCase } from '@src/application/usecases/getWeatherReportByCoordinates.usecase';
import { ConfigModule } from '@nestjs/config';
import { WeatherReportController } from '@src/adapter/weatherReport.controller';
import { EnvConfigService } from '@src/infrastructure/services/config.service';
import { WeatherReport } from '@src/domain/models/weatherReport';

describe('GetWeatherReportByCoordinatesUseCase', () => {
  let getWeatherReportByCoordinatesUseCase: GetWeatherReportByCoordinatesUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
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
      }).compile();

      getWeatherReportByCoordinatesUseCase = moduleRef.get(GetWeatherReportByCoordinatesUseCase);
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
