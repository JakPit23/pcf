import * as React from 'react';
import { Label } from '@fluentui/react-components'; // Ensure Label is used in the render method
import { WeatherType, IWeatherData } from './types/WeatherData';
import { WeatherBox } from './WeatherBox';


export interface IWeatherListProps {}

export class WeatherList extends React.Component<IWeatherListProps, {weatherData: IWeatherData[]}> {

  constructor(props: IWeatherListProps) {
    super(props);
    this.state = {
      weatherData: [],
    };
  }
  private getWeatherType(temperature: number): WeatherType {
    // fallback on Sunny
    let weatherType: WeatherType = WeatherType.SUNNY;
    // get weather type based on temperature
    if (temperature <= -5)
      weatherType = WeatherType.SNOW;
      else if (temperature >= -5 && temperature <= 5)
      weatherType = WeatherType.RAINSNOW;
      else if (temperature >= 5 && temperature <= 10)
      weatherType = WeatherType.CLOUDY;
      else if (temperature >= 10 && temperature <= 20)
      weatherType = WeatherType.PARTLYCLOUDYDAY;
      else if (temperature >= 20)
      weatherType = WeatherType.SUNNY;

      return weatherType;
  }
  private async getWeatherData(): Promise<IWeatherData[]> {
      // get real weather forecast from API (location set on Prague)
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=50.0557718&longitude=14.4656125&daily=temperature_2m_mean`);
      const data = await response.json();
  
      const weatherData: IWeatherData[] = [];
  
      // API returns 7-day forecast, but we need only 5
      for (let i = 0; i < 5; i++) {
        // get date, temperature and weather type
        const date = new Date(data.daily.time[i]);
        const temp = data.daily.temperature_2m_mean[i];
        const type = this.getWeatherType(temp);
        
        // add daily weather data to array
        weatherData.push({
          date: date,
          temperature: temp,
          weatherType: type,
        });
      }
  
      return weatherData;
  }

  public async componentDidMount(): Promise<void> {
    // fetch the data when component is ready
    const weatherData = await this.getWeatherData();
    this.setState({ weatherData });
  }



  public render(): React.ReactNode {
    return (
      <div>
        <Label>5-day Weather Forecast</Label>
        <div className='weather-list'>
          {this.state.weatherData.map((weather, index) => (
            <WeatherBox
              key={index}
              temperature={weather.temperature}
              weatherType={weather.weatherType}
              date={weather.date.toLocaleDateString('en-US')}
            />
          ))}
        </div>
      </div>
    );
  }
}
