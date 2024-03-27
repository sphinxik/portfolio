import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useWeatherService from '../../services/weatherService';

import AppHeader from '../appHeader/AppHeader';
import AppFooter from '../appFooter/AppFooter';
import CitiesList from '../citiesList/CitiesList';

function App() {
  const [cities, setCities] = useState([]);
  const { getCityWeather } = useWeatherService();

  useEffect(() => {
    if (localStorage.getItem('ikcWeather')) {
      const lsData = JSON.parse(localStorage.getItem('ikcWeather'));

      if(lsData.length) {
        getSavedCities(lsData);
      }
    }
  }, []);

  const addDataToLocalStorage = (data) => {
    localStorage.setItem('ikcWeather', JSON.stringify(data));
  };

  const getSavedCities = async (savedCities) => {
    const toastLoading = toast.loading('Loading...');
    const savedCitiesWeather = [];

    for (const city of savedCities) {
      await getCityWeather(city.coord).then(data => {
        if (data) {
          savedCitiesWeather.push(data);
        }

        toast.remove(toastLoading);
      }).catch(() => {
        toast.error("Network error! Please try again later.");
        toast.remove(toastLoading);
      });
    }

    setCities(savedCitiesWeather);
  }

  const addCity = (cityID, cityCoord) => {
    const isCityExists = cities.some(city => city.id === cityID);

    if (!isCityExists) {
      const toastLoading = toast.loading('Loading...');

      getCityWeather(cityCoord).then(data => {
        if (data) {
          const newData = [...cities, data];
          setCities(newData);
          addDataToLocalStorage(newData.map(item => ({ id: item.id, coord: item.coord })));
          toast.success('City successfully added.');
        } else {
          toast.error("No data found for this city.");
        }

        toast.remove(toastLoading);
      }).catch(() => {
        toast.error("Network error! Please try again later.");
        toast.remove(toastLoading);
      });
    } else {
      toast.error("This city has already been added.");
    }
  };

  const removeCity = (cityID) => {
    const newData = cities.filter(city => city.id !== cityID);
    const newDataForLS = newData.map(item => ({ id: item.id, coord: item.coord }));
    
    addDataToLocalStorage(newDataForLS);
    setCities(newData);
    toast.success('The city was successfully deleted.');
  };

  return (
    <div className='wrapper'>
      <div className="wrapper__background"></div>

      <AppHeader addCity={addCity} />

      <div className="main">
        <section className="cities">
          <div className="container">
            <h1 className="cities__title section__title">Weather</h1>

            <CitiesList cities={cities} removeCity={removeCity} />
          </div>
        </section>
      </div>

      <AppFooter />

      <Toaster />
    </div>
  )
}

export default App;