import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import GameCard from "../gameCard/GameCard";

const Search = () => {
  const dataSelector = createSelector(
    state => state.data,
    state => state.searchValue,
    (data, searchValue) => {
      if(searchValue !== '') {
        return data.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
      } else {
        return [];
      }
    }
  );
  const data = useSelector(dataSelector);

  return (
    <section className="search page-section">
      <div className="container">
        <h1 className="search__title title">Search list</h1>

        <div className="search__list games__list">
          { 
            data.length ? data.map(item => <GameCard key={item.id} data={item} />) : 'There are no games found...'
          }
        </div>
      </div>
    </section>
  );
};
export default Search;