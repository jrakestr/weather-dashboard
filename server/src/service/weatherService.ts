import dayjs, { type Dayjs } from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

interface Coordinates {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

class Weather {
  city: string;
  date: Dayjs | string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  icon: string;
  iconDescription: string;
  constructor(
    city: string,
    date: Dayjs | string,
    tempF: number,
    windSpeed: number,
    humidity: number,
    icon: string,
    iconDescription: string
  ) {
    this.city = city;
    this.date = date;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.icon = icon;
    this.iconDescription = iconDescription;
  }
}

class WeatherService {
  private geocodingBaseURL: string;
  private weatherBaseURL: string;
  private apiKey: string;

  constructor() {
    this.geocodingBaseURL = 'http://api.openweathermap.org/geo/1.0';
    this.weatherBaseURL = 'https://api.openweathermap.org/data/2.5';
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      throw new Error('OpenWeather API key not found in environment variables');
    }
    this.apiKey = apiKey;
  }

  private async fetchLocationData(cityName: string): Promise<Coordinates> {
    try {
      const geocodingUrl = `${this.geocodingBaseURL}/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${this.apiKey}`;
      const response = await fetch(geocodingUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch location data: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data || data.length === 0) {
        throw new Error('City not found');
      }

      return this.destructureLocationData(data[0]);
    } catch (error) {
      console.error('Error fetching location data:', error);
      throw error;
    }
  }

  private destructureLocationData(locationData: any): Coordinates {
    if (!locationData || !locationData.lat || !locationData.lon) {
      throw new Error('Invalid location data received');
    }

    return {
      name: locationData.name,
      lat: locationData.lat,
      lon: locationData.lon,
      country: locationData.country,
      state: locationData.state
    };
  }

  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      const weatherUrl = `${this.weatherBaseURL}/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
      const response = await fetch(weatherUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data || !data.list) {
        throw new Error('Invalid weather data received');
      }

      return this.processWeatherData(data, coordinates.name);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

  private processWeatherData(data: any, cityName: string): Weather[] {
    if (!data.list || !Array.isArray(data.list)) {
      throw new Error('Invalid weather data format');
    }

    // Get current weather
    const currentWeather = new Weather(
      cityName,
      dayjs(data.list[0].dt * 1000),
      data.list[0].main.temp,
      data.list[0].wind.speed,
      data.list[0].main.humidity,
      data.list[0].weather[0].icon,
      data.list[0].weather[0].description
    );

    // Get one forecast per day at noon
    const dailyForecasts = data.list.reduce((acc: Weather[], forecast: any) => {
      const forecastDate = dayjs(forecast.dt * 1000);
      const existingForecast = acc.find(f => 
        dayjs(f.date).format('YYYY-MM-DD') === forecastDate.format('YYYY-MM-DD')
      );

      if (!existingForecast && acc.length < 5) {
        acc.push(new Weather(
          cityName,
          forecastDate,
          forecast.main.temp,
          forecast.wind.speed,
          forecast.main.humidity,
          forecast.weather[0].icon,
          forecast.weather[0].description
        ));
      }

      return acc;
    }, []);

    return [currentWeather, ...dailyForecasts];
  }

  async getWeatherForCity(cityName: string): Promise<Weather[]> {
    try {
      const coordinates = await this.fetchLocationData(cityName);
      return await this.fetchWeatherData(coordinates);
    } catch (error) {
      console.error('Error getting weather for city:', error);
      throw error;
    }
  }
}

export default new WeatherService();
