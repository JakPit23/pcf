import * as React from "react";
import { Label, Card } from "@fluentui/react-components";

export interface IWeatherBoxProps {
    date: Date;
    temperature: number;
    weatherType: string;
}


export class WeatherBox extends React.Component<IWeatherBoxProps> {
    public render(): React.ReactNode {
        return (
            <Card className="weather-box">
                <Label>{this.props.date.toLocaleDateString('en-US')}</Label>
                <Label>{this.props.temperature} °C</Label>
                <Label>{this.props.weatherType}</Label>
            </Card>
        )
    }

}