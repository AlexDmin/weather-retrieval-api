import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { WeatherReportController } from '@src/adapter/weatherReport.controller';
import { GetWeatherReportByCoordinatesUseCase, WEATHER_REPORT_SERVICE } from '@src/application/usecases/getWeatherReportByCoordinates.usecase';
import { MOCKED_WEATHER_REPORT } from '@src/domain/data/weatherReport.mocked';
import { CoordinatesDTO } from '@src/infrastructure/dtos/coordinates.dto';
import { EnvConfigService } from '@src/infrastructure/services/config.service';
import { ExceptionsService } from '@src/infrastructure/services/exceptions.service';
import { EXCEPTIONS_SERVICE, WeatherReportAPICliService } from '@src/infrastructure/services/weatherReport.apicli.service';
import { WeatherReportMockedService } from '@src/infrastructure/services/weatherReport.mocked.service';
import * as request from 'supertest';

describe('weater report controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [WeatherReportController],
      providers: [
        EnvConfigService,
        WeatherReportMockedService,
        ExceptionsService,
        {
          provide: WEATHER_REPORT_SERVICE,
          useExisting: WeatherReportMockedService
        },
        {
          provide: EXCEPTIONS_SERVICE,
          useExisting: ExceptionsService
        },
        GetWeatherReportByCoordinatesUseCase
      ],
      }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('getWeather', () => {
    it('should return the weather data', async () => {
      const coordinates: CoordinatesDTO = {
        lat: 1,
        lng: 1,
      };
      const response = await request(app.getHttpServer())
      .get('/api/weather')
      .query(coordinates)
      .expect(200)

      const weather = response.body;
      
      expect(weather).toEqual(MOCKED_WEATHER_REPORT);
    });
  });

  
  describe('getWeather with wrong parameters', () => {
    it('should return bad request', async () => {
      const coordinates = {
        lat: 1,
        long: 1,
      };
      await request(app.getHttpServer())
      .get('/api/weather')
      .query(coordinates)
      .expect(400)
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
