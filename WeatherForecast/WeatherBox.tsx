import * as React from 'react';
import { makeStyles, Label, Card, Title3, Title1 } from '@fluentui/react-components';
import {WeatherSunny48Regular, WeatherCloudy48Regular, WeatherPartlyCloudyDay48Regular, WeatherRainSnow48Regular, WeatherSnow48Regular, TextFontSize24Regular} from "@fluentui/react-icons";

export interface IWeatherBoxProps {
    date?: Date;
    temperature?: number;
    weatherType?: string;
}

export class WeatherBox extends React.Component<IWeatherBoxProps> {
    public render(): React.ReactNode {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        if(!this.props.date || !this.props.temperature || !this.props.weatherType) { 
            return null;
        }
        
    
        return (
    
            <Card className='weather-box'>

                <Title3 align='center' >{daysOfWeek[this.props.date?.getDay()]}</Title3>
                <Label>{this.props.date?.toLocaleDateString('en-US')}</Label>
                <Title1 align='center'>{Math.round(this.props.temperature)} °C</Title1>
                <div className='icon'>
                    {this.props.weatherType === "Sunny" && <WeatherSunny48Regular />}
                    {this.props.weatherType === "Cloudy" && <WeatherCloudy48Regular/>}
                    {this.props.weatherType === "PartlyCloudyDay" && <WeatherPartlyCloudyDay48Regular/>}
                    {this.props.weatherType === "RainSnow" && <WeatherRainSnow48Regular/>}
                    {this.props.weatherType === "Snow" && <WeatherSnow48Regular/>}
                </div>
                <Label>{this.props.weatherType}</Label>

            </Card>
        );
    }
}