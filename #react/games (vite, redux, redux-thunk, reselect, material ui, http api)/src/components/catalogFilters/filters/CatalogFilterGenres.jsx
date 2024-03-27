import { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';

import ClickAwayListener from "@mui/base/ClickAwayListener";
import PopperUnstyled from "@mui/base/PopperUnstyled";

const CatalogFilterGenres = () => {
  const data = useSelector(state => state.data);
  const activeGenres = useSelector(state => state.filters['genres']);
  const [gamesGenres, setGamesGenres] = useState([]);
  const [openGenreFilter, setOpenGenreFilter] = useState(false);
  const sortGenreBtn = useRef();

  useEffect(() => {
    updateGamesGenres(data);
  }, [data]);

  const updateGamesGenres = (data) => {
    const genres = [...new Set(data.map((item) => item.genre))];
    setGamesGenres(genres);
  };

  const renderGenresList = () => {
    return gamesGenres.map(genre => {
      const isChecked = activeGenres.includes(genre);

      return (
        <label key={genre} className="catalog__filters-body-item">
          <input className="check-input" type="checkbox" name="genres" value={genre} defaultChecked={isChecked} />
          <span className="check-custom"></span>
          <span className="check-txt">{genre}</span>
        </label>
      );
    });
  };

  const genres = gamesGenres.length ? renderGenresList() : "There are no genres...";

  return(
    <ClickAwayListener onClickAway={() => setOpenGenreFilter(false)}>
      <div className="catalog__filters-item">
        <button ref={sortGenreBtn} className="catalog__filters-btn btn" type="button" onClick={() => setOpenGenreFilter((open) => !open)}>
          Genre
        </button>
        <PopperUnstyled id="simple-popper-genre" className="catalog__filters-popup" open={openGenreFilter} anchorEl={sortGenreBtn.current} disablePortal={true} keepMounted={true} placement={"bottom-start"}>
          <div className="catalog__filters-popup-inner">{genres}</div>
        </PopperUnstyled>
      </div>
    </ClickAwayListener>
  );
};
export default CatalogFilterGenres;