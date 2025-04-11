import * as React from 'react';
import { Label, Card } from '@fluentui/react-components';
import {WeatherSunny48Regular, WeatherCloudy48Regular, WeatherPartlyCloudyDay48Regular, WeatherRainSnow48Regular, WeatherSnow48Regular} from "@fluentui/react-icons";

export interface IWeatherBoxProps {
    date?: string;
    temperature?: number;
    weatherType?: string;
}

export class WeatherBox extends React.Component<IWeatherBoxProps> {
    public render(): React.ReactNode {
        console.log(this.props.date);
        return (
            <Card className='weather-box'>
                <Label>{this.props.date}</Label>
                <Label>{this.props.temperature} °C</Label>
                <Label>{this.props.weatherType}</Label>
                {/* dynamic icon names from fluentui */}
                <div className='icon'>
                    {this.props.weatherType === "Sunny" && <WeatherSunny48Regular/>}
                    {this.props.weatherType === "Cloudy" && <WeatherCloudy48Regular/>}
                    {this.props.weatherType === "PartlyCloudyDay" && <WeatherPartlyCloudyDay48Regular/>}
                    {this.props.weatherType === "RainSnow" && <WeatherRainSnow48Regular/>}
                    {this.props.weatherType === "Snow" && <WeatherSnow48Regular/>}
                </div>

            </Card>
        );
    }
}