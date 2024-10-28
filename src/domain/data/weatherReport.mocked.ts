import { WeatherReport } from "../models/weatherReport";

export const MOCKED_WEATHER_REPORT: WeatherReport =  {
    weather: [{
        weather: 'Sunny',
        description: 'Clear sky'
    }],
    temperatureKelvins: 250,
    humidityPercentage: 30
}
