import { Coordinates } from "../models/coordinates";
import { WeatherReport } from "../models/weatherReport";

export interface WeatherReportServiceI {
    getWeatherByCoordinates(coordinates: Coordinates): Promise<WeatherReport>;
}