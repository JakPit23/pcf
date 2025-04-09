export enum WeatherType {
    CLOUDY = "Cloudy",
    SUNNY = "Sunny",
    SNOW = "Snow",
    RAINSNOW = "RainSnow",
    PARTLYCLOUDYDAY = "PartlyCloudyDay"
}

export interface IWeatherData {
    date: Date;
    temperature: number;
    weatherType: WeatherType;
}

export class DataGenerator {
    private generateWeatherData(): IWeatherData[] {
        let startDate = new Date();
        let weatherData: IWeatherData[] = [];
        for (let i = 0; i < 5; i++) {
        let date = new Date();
        date.setDate(startDate.getDate() + i);
        let temperature = Math.floor(Math.random() * 51) - 25;
        let weatherType: WeatherType = WeatherType.SUNNY;
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
        weatherData.push({
        date: date,
        temperature: temperature,
        weatherType: weatherType
        });
        }
        return weatherData;
        }
    
        public getWeatherData(): IWeatherData[] {
        return this.generateWeatherData();
        }
}

