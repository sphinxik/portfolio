import { useDispatch, useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async';
import toast from 'react-hot-toast';
import { BiSearchAlt } from 'react-icons/bi';

import useWeatherService from '../../services/weatherService';
import { fetchWeather } from '../../slices/weatherSlice';

import "./searchForm.scss";

const SearchForm = (props) => {
  const weather = useSelector(state => state.weather.data);
  const dispatch = useDispatch();
  const { getSearchedCities } = useWeatherService();

  const onSelect = (selectedCity) => {
    const isCityExists = weather.some(city => city.id === selectedCity.id);

    if (isCityExists) {
      toast.error("This city has already been added.");
    } else {
      dispatch(fetchWeather(selectedCity.coord));
    }
  };

  const loadOptions = (inputValue, callback) => {
    if (inputValue !== '') {
      getSearchedCities(inputValue).then(data => {
        const options = data.map(item => {
          const cityState = (item.state !== '') ? ', ' + item.state : '';

          return {
            id: item.id,
            coord: item.coord,
            label: `${item.name}, ${item.country} ${cityState}`
          }
        });

        callback(options);
      });
    }
  };

  return (
    <div className="search__form">
      <AsyncSelect className="custom-select" classNamePrefix="react-select"
        value=""
        placeholder={'Find city...'}
        loadOptions={loadOptions}
        onChange={onSelect}
        noOptionsMessage={() => "Сity not found..."} />

      <div className="search__form-icon"><BiSearchAlt /></div>
    </div>
  );
};
export default SearchForm;