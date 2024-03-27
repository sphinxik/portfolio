import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataGenres } from '../../slices/filtersSlice';

import ErrorMessage from "../appErrorMessage/AppErrorMessage";
import Spinner from "../appSpinner/AppSpinner";

function AppSidebarFilterGenres({ dataType }) {
  const genresLoadingStatus = useSelector(state => state.filters.genresLoadingStatus);
  const activeDataGenres = useSelector(state => state.filters.activeDataGenres);
  const dataGenres = useSelector(state => state.filters.dataGenres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataGenres(dataType));
  }, [dataType]);

  if (genresLoadingStatus === "loading") {
    return <Spinner />;
  } else if (genresLoadingStatus === "error") {
    return <ErrorMessage />;
  } else if (!dataGenres.length) {
    return "Not found...";
  }

  const renderGenresItems = () => {
    return dataGenres.map(({ id, name }) => {
      const isChecked = activeDataGenres.includes(id);
      
      return (
        <li key={dataType + '_' + id}>
          <label className="check-label"> 
            <input className="check-input" type="checkbox" name="genres" value={id} defaultChecked={isChecked} />
            <span className="check-custom">{name}</span>
          </label>
        </li>
      );
    });
  };

  return <ul className="sidebar-filters__genres">{renderGenresItems()}</ul>;
}

export default AppSidebarFilterGenres;
