import * as React from 'react';
import { Label } from '@fluentui/react-components';


import { WeatherBox } from './WeatherBox';
import { IWeatherData } from './lib/DataGenerator';

export interface IWeatherForecastListProps {
  weatherData: IWeatherData[];
}


export class WeatherForecastList extends React.Component<IWeatherForecastListProps> {
  public render(): React.ReactNode {
    return (
      <div className='weather-forecast-list'>
          {this.props.weatherData.map((data, index) => (
            <WeatherBox key={data.date.toString()} date={data.date} temperature={data.temperature} weatherType={data.weatherType}/>
          ))}
      </div>
    )

  }
}
