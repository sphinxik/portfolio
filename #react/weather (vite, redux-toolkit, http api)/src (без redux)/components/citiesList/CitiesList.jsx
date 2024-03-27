import City from '../city/City';

const CitiesList = ({cities, removeCity}) => {
  const renderContent = () => {
    return cities.map(city => <City key={city.id} city={city} removeCity={removeCity} />);
  };

  const content = cities.length ? renderContent() : "Please select a city in the search form above...";

  return (
    <div className="cities__list">
      {content}
    </div>
  );
};
export default CitiesList;