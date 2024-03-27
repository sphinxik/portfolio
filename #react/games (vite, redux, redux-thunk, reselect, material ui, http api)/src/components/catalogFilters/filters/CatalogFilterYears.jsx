import { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';

import SliderUnstyled from "@mui/base/SliderUnstyled";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import PopperUnstyled from "@mui/base/PopperUnstyled";

const CatalogFilterYears = () => {
  const data = useSelector(state => state.data);
  const activeYears = useSelector(state => state.filters['years']);
  const [gamesDevYears, setGamesDevYears] = useState([]);
  const [openYearsFilter, setOpenYearsFilter] = useState(false);
  const sortYearsBtn = useRef();

  useEffect(() => {
    updateGamesDevYears(data);
  }, [data]);

  const updateGamesDevYears = (data) => {
    const years = data.map((item) => new Date(item.release_date).getFullYear());
    setGamesDevYears([Math.min(...years), Math.max(...years)]);
  };

  const defaultSliderValue = activeYears.length ? activeYears : gamesDevYears;

  return(
    <ClickAwayListener onClickAway={() => setOpenYearsFilter(false)}>
      <div className="catalog__filters-item">
        <button ref={sortYearsBtn} className="catalog__filters-btn btn" type="button" onClick={() => setOpenYearsFilter((open) => !open)}>
          Realease year
        </button>

        <PopperUnstyled id="simple-popper-years" className="catalog__filters-popup" open={openYearsFilter} anchorEl={sortYearsBtn.current} disablePortal={true} keepMounted={true} placement={"bottom-start"}>
          {gamesDevYears.length ? (
            <div className="catalog__filters-popup-inner">
              <SliderUnstyled
                key={activeYears}
                className="catalog__filters-range"
                defaultValue={defaultSliderValue}
                min={gamesDevYears[0]}
                max={gamesDevYears[1]}
                name="years"
                slots={{ valueLabel: ({ children }) => <span className="MuiSlider-label">{children}</span> }} />
            </div>
          ) : null}
        </PopperUnstyled>
      </div>
    </ClickAwayListener>
  );
};
export default CatalogFilterYears;