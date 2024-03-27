import useHttp from "../hooks/http.hook";
import { getDate, getDateFromTimestamp } from "../utils";

const useWeatherService = () => {
  const _apiBaseWeather = "https://api.openweathermap.org/data/2.5/forecast";
  const _apiKey = "029e7973205cf7467eebf608bb71f77d";
  //const _citiesJsonURL = "http://localhost:5173/" // local
  const _citiesJsonURL = "https://ikc-weather.web.app/" // firebase
  const { request } = useHttp();

  const getSearchedCities = async (searchValue = '') => {
    const data = await request(`${_citiesJsonURL}cities.json`, 'GET', {'Content-Type': 'application/json'});
    const filteredCities = data.filter(city => city.name.toLowerCase() === searchValue.toLowerCase());
    return filteredCities;
  };

  const getCityWeather = async (coord) => {
    const weather = await request(`${_apiBaseWeather}?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${_apiKey}`);
    return _transformWeatherData(weather);
  };

  const _transformWeatherData = (data) => {
    const currentDate = getDate(data.city.timezone);
    const weatherFuture = [];

    for (let i = 0; i < 10; i++) {
      const obj = {
        time: getDateFromTimestamp(data.list[i].dt).time,
        temperature: Math.round(data.list[i].main.temp),
      };
      weatherFuture.push(obj);
    }

    return {
      id: data.city.id,
      country: data.city.country,
      name: data.city.name,
      date: currentDate.date,
      day: currentDate.day,
      time: currentDate.time,
      weather: {
        icon: data.list[0].weather[0].icon,
        descr: data.list[0].weather[0].main,
        temp: Math.round(data.list[0].main.temp),
        wind: data.list[0].wind.speed,
        humidity: data.list[0].main.humidity,
        pressure: data.list[0].main.pressure
      },
      coord: data.city.coord,
      weatherFuture
    };
  };

  return { getCityWeather, getSearchedCities };
};

export default useWeatherService;
