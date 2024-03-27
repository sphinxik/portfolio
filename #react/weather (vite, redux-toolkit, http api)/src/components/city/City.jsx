import { useDispatch } from 'react-redux';
import { BiSolidTrash } from 'react-icons/bi';

import { removeCity } from '../../slices/weatherSlice';

import WeatherChart from '../weatherChart/WeatherChart';
import "./city.scss";

const City = ({id, country, name, date, day, time, weather, weatherFuture}) => {
  const dispatch = useDispatch();

  return (
    <div className="city">
      <div className="city__info">
        <div className="city__top">
          <div className="city__name">
            <span>{country}</span> <span>{name}</span>
          </div>

          <button className="city__delete-btn" type="button" onClick={ () => dispatch(removeCity(id)) }>
            <BiSolidTrash />
          </button>
        </div>

        <div className="city__weather">
          <div className="city__weather-col">
            <div className="city__date">{date} - {day}</div>
            <div className="city__time">{time}</div>
            <div className="city__weather-item">
              <span>Wind</span> - <span>{weather.wind} m/s</span>
            </div>
            <div className="city__weather-item">
              <span>Humidity</span> - <span>{weather.humidity} %</span>
            </div>
            <div className="city__weather-item">
              <span>Preasure</span> - <span>{weather.pressure} hPa</span>
            </div>
          </div>

          <div className="city__weather-col">
            <div className="city__weather-icon">
              <img src={`//openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${weather.icon}.png`} alt="icon" />
            </div>
            <div className="city__weather-descr">{weather.descr}</div>
            <div className="city__weather-temp">{weather.temp} °C</div>
          </div>
        </div>
      </div>

      <div className="city__chart">
        <WeatherChart data={weatherFuture} />
      </div>
    </div>
  );
};
export default City;