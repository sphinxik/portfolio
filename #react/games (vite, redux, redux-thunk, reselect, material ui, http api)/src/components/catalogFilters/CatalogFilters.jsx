import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from "../../actions";

import CatalogFilterSortBy from "./filters/CatalogFilterSortBy";
import CatalogFilterGenres from "./filters/CatalogFilterGenres";
import CatalogFilterYears from "./filters/CatalogFilterYears";
import "./catalogFilters.scss";

const CatalogFilters = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);

  if(data.length === 0) {
    return null;
  }

  const onSubmitFilterForm = (e) => {
    e.preventDefault();
    const formDataArr = [...new FormData(e.target)];

    const newFilters = {
      sort_by: '',
      genres: [],
      years: []
    };

    formDataArr.forEach(item => {
      if(item[0] === 'sort_by') {
        newFilters[item[0]] = item[1];
      } else if (item[0] === 'years') {
        newFilters[item[0]].push(Number(item[1]));
      } else {
        newFilters[item[0]].push(item[1]);
      }
    });

    dispatch(setFilters(newFilters));
  };

  return(
    <form className="catalog__filters filters" onSubmit={onSubmitFilterForm}>
      <CatalogFilterSortBy />
      <CatalogFilterGenres />
      <CatalogFilterYears />

      <div className="catalog__filters-item">
        <button className="catalog__filters-submit btn" type="submit">
          Filter
        </button>
      </div>
    </form>
  );
};
export default CatalogFilters;