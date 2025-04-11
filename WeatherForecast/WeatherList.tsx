import * as React from 'react';
import { FluentProvider, Title3, webLightTheme } from '@fluentui/react-components'; 
import { WeatherType, IWeatherData } from './types/WeatherData';
import { WeatherBox } from './WeatherBox';

export interface IWeatherListProps {
  title: string;
}

export interface APIResponse {
  latitude: number;
  longitude: number;
  generation_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: {
    time: string,
    temperature_2m_mean: string,
  },
  daily: {
    time: string[],
    temperature_2m_mean: number[],
  }
}

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
      const response: Response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=50.0557718&longitude=14.4656125&daily=temperature_2m_mean`);
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: APIResponse = await response.json();
      console.log(typeof data);
  
      const weatherData: IWeatherData[] = [];
  
      // API returns 7-day forecast, but we need only 5
      for (let i = 0; i < 5; i++) {
        // get date, temperature and weather type
        const date:Date = new Date(data.daily.time[i]);
        const temp:number = data.daily.temperature_2m_mean[i];
        const type:WeatherType = this.getWeatherType(temp);
        
        // add daily weather data to array
        weatherData.push({
          date: date,
          temperature: temp,
          weatherType: type,
        });
      }
  
      return weatherData;
  }

  public componentDidMount() : void {
    // fetch the data when component is ready
    this.getWeatherData().then((weatherData) => {this.setState({ weatherData }); return;}).catch((err) => {console.error(err)});
  }



  public render(): React.ReactNode {
    return (
      <FluentProvider theme={webLightTheme}>
        <Title3 as='h1' align='center'>{this.props.title}</Title3>
        <div className='weather-list'>
          {this.state.weatherData.map((weather, index) => (
            <WeatherBox
              key={index}
              temperature={weather.temperature}
              weatherType={weather.weatherType}
              date={weather.date}
            />
          ))}
        </div>
      </FluentProvider>
    );
  }
}
