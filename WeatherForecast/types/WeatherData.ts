// Global types for weather data

export enum WeatherType {
  CLOUDY = 'Cloudy',
  SUNNY = 'Sunny',
  SNOW = 'Snow',
  RAINSNOW = 'RainSnow',
  PARTLYCLOUDYDAY = 'PartlyCloudyDay',
}

export interface IWeatherData {
  date: Date; // Date of the weather data
  temperature: number; // Temperature in Celsius
  weatherType: WeatherType; // Weather condition (e.g., sunny, rainy)
}