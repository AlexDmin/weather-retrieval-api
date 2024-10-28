import { Forecast, WeatherReport } from '@src/domain/models/weatherReport';
import { ForecastDTO, WeatherReportDTO } from '../dtos/weatherReport.dto';

export const WeatherReportMapper = {
  fromDTOToModel(weatherReportDTO: WeatherReportDTO): WeatherReport {
    return {
      weather: fromWeatherReportDTOArrayToModelArray(weatherReportDTO.weather),
      temperatureKelvins: weatherReportDTO.main.temp,
      humidityPercentage: weatherReportDTO.main.humidity,
    };
  },
};

function fromWeatherReportDTOToModel(forecast: ForecastDTO): Forecast {
  return {
    weather: forecast.main,
    description: forecast.description,
  };
}

function fromWeatherReportDTOArrayToModelArray(
  forecastArray: ForecastDTO[],
): Forecast[] {
  return forecastArray.map(fromWeatherReportDTOToModel);
}
