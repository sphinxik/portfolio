import { useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import Select from "react-select";

function AppSidebarFilterSort({ dataType }) {
  const sortDataOptions = useSelector(state => state.filters.sortDataOptions);
  const refSortSelect = useRef();

  useEffect(() => {
    refSortSelect.current.setValue("");
  }, [dataType]);

  return(
    <Select
      ref={refSortSelect}
      className="sidebar-select"
      classNamePrefix="sidebar-select"
      name="sortBy"
      defaultValue={""}
      isSearchable={false}
      options={sortDataOptions}
    />
  );
};
export default AppSidebarFilterSort;