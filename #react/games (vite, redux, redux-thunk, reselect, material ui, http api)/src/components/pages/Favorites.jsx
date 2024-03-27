import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import GameCard from "../gameCard/GameCard";

const Favorites = () => {
  const dataSelector = createSelector(
    state => state.data,
    state => state.favorites,
    (data, favorites) => {
      if(favorites.length) {
        return data.filter(item => favorites.includes(item.id));
      } else {
        return [];
      }
    }
  );
  const data = useSelector(dataSelector);

  return (
    <section className="favorites page-section">
      <div className="container">
        <h1 className="favorites__title title">Favorites</h1>

        <div className="favorites__list games__list">
          { 
            data.length ? data.map(item => <GameCard key={item.id} data={item} />) : 'There are no added games...'
          }
        </div>
      </div>
    </section>
  );
};
export default Favorites;