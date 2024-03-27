import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import useWeatherService from '../../services/weatherService';

import { BiSearchAlt } from 'react-icons/bi';
import "./searchForm.scss";

const SearchForm = ({ addCity }) => {
  const [inputValue, setInputValue] = useState('');
  const { getSearchedCities } = useWeatherService();

  const onSelect = (city) => {
    addCity(city.id, city.coord);
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
        value={inputValue}
        placeholder={'Find city...'}
        loadOptions={loadOptions}
        onChange={onSelect}
        noOptionsMessage={() => "Сity not found..."} />

      <div className="search__form-icon"><BiSearchAlt /></div>
    </div>
  );
};
export default SearchForm;