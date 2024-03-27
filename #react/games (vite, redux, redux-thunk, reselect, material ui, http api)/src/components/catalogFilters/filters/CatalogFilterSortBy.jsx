import { useSelector } from 'react-redux';

import SelectUnstyled from "@mui/base/SelectUnstyled";
import OptionUnstyled from "@mui/base/OptionUnstyled";

const CatalogFilterSortBy = () => {
  const activeSortBy = useSelector(state => state.filters['sort_by']);

  return(
    <div className="catalog__filters-item">
      <SelectUnstyled className="catalog__filters-btn btn" name="sort_by" 
                                                           defaultValue={activeSortBy}
                                                           slotProps={{ popper: { className: "catalog__filters-popup" }, listbox: { className: "catalog__filters-popup-inner" } }} 
                                                           renderValue={() => "Sort by"}>
        <OptionUnstyled value="title_az">Title (A-Z)</OptionUnstyled>
        <OptionUnstyled value="title_za">Title (Z-A)</OptionUnstyled>
        <OptionUnstyled value="date_desc">Date desc</OptionUnstyled>
        <OptionUnstyled value="date_asc">Date asc</OptionUnstyled>
      </SelectUnstyled>
    </div>
  );
};
export default CatalogFilterSortBy;