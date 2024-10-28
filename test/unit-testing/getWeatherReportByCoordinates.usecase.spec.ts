import { GetWeatherReportByCoordinatesUseCase } from '@src/application/usecases/getWeatherReportByCoordinates.usecase';
import { MOCKED_WEATHER_REPORT } from '@src/domain/data/weatherReport.mocked';
import { WeatherReportMockedService } from '@src/infrastructure/services/weatherReport.mocked.service';

describe('GetWeatherReportByCoordinatesUseCase', () => {
  let getWeatherReportByCoordinatesUseCase: GetWeatherReportByCoordinatesUseCase;
  let weatherReportService: WeatherReportMockedService;

  beforeEach(() => {
    weatherReportService = new WeatherReportMockedService();
    getWeatherReportByCoordinatesUseCase =
      new GetWeatherReportByCoordinatesUseCase(weatherReportService);
  });

  describe('getWeather', () => {
    it('should return the weather data', async () => {
      const weather = await getWeatherReportByCoordinatesUseCase.execute({
        latitude: 1,
        longitude: 1,
      });
      
      expect(weather).toBe(MOCKED_WEATHER_REPORT);
    });
  });
});
