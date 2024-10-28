export interface WeatherReportDTO {
  weather: ForecastDTO[];
  main: MainWeatherDataDTO;
}

export interface ForecastDTO {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MainWeatherDataDTO {
  temp: number;
  humidity: number;
}
