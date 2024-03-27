import WeatherChart from '../weatherChart/WeatherChart';
import { BiSolidTrash } from 'react-icons/bi';
import "./city.scss";

const City = ({city, removeCity}) => {
  return (
    <div className="city">
      <div className="city__info">
        <div className="city__top">
          <div className="city__name">
            <span>{city.country}</span> <span>{city.name}</span>
          </div>

          <button className="city__delete-btn" type="button" onClick={() => removeCity(city.id)}>
            <BiSolidTrash />
          </button>
        </div>

        <div className="city__weather">
          <div className="city__weather-col">
            <div className="city__date">{city.date} - {city.day}</div>
            <div className="city__time">{city.time}</div>
            <div className="city__weather-item">
              <span>Wind</span> - <span>{city.weather.wind} m/s</span>
            </div>
            <div className="city__weather-item">
              <span>Humidity</span> - <span>{city.weather.humidity} %</span>
            </div>
            <div className="city__weather-item">
              <span>Preasure</span> - <span>{city.weather.pressure} hPa</span>
            </div>
          </div>

          <div className="city__weather-col">
            <div className="city__weather-icon">
              <img src={`//openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${city.weather.icon}.png`} alt="icon" />
            </div>
            <div className="city__weather-descr">{city.weather.descr}</div>
            <div className="city__weather-temp">{city.weather.temp} °C</div>
          </div>
        </div>
      </div>

      <div className="city__chart">
        <WeatherChart data={city.weatherFuture} />
      </div>
    </div>
  );
};
export default City;