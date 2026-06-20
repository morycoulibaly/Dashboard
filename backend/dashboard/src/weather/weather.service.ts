import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosError } from 'axios'; 

@Injectable()
export class WeatherService {
  private readonly lienMeteo = 'https://api.openweathermap.org/data/2.5/weather';

  async getWeather(city: string) {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    try {
      const response = await axios.get(this.lienMeteo, {
        params: {
          q: city,
          appid: apiKey, 
          units: 'metric',
        },
      });

      return {
        city: response.data.name,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed,
        description: response.data.weather[0].description,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      
      const status = axiosError.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      
      const responseData = axiosError.response?.data as any;
      const message = responseData?.message || 'Erreur lors de la récupération de la météo';
      
      throw new HttpException(`Erreur Météo: ${message}`, status);
    }
  }
}