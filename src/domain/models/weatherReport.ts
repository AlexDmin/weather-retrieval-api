export interface WeatherReport {
  weather: Forecast[];
  temperatureKelvins: number;
  humidityPercentage: number;
}

export interface Forecast {
  weather: string;
  description: string;
}
