import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchWeather } from '../../slices/weatherSlice';

import City from '../city/City';

const CitiesList = (props) => {
  const weather = useSelector(state => state.weather.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('ikcWeather')) {
      const lsData = JSON.parse(localStorage.getItem('ikcWeather'));

      if(lsData.length) {
        for (const city of lsData) {
          dispatch(fetchWeather(city.coord));
        }
      }
    }
  }, []);

  return (
    <div className="cities__list">
      {
        weather.length ? 
          weather.map(city => <City key={city.id} {...city} />) :
          "Please select a city in the search form above..."
      }
    </div>
  );
};
export default CitiesList;