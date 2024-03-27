import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, resetData } from "../../slices/dataSlice";
import { setDataFilters } from "../../slices/filtersSlice";

import { goTo } from "../../utils/Utils";

import MainBanner from "../mainBanner/MainBanner";
import MediaItemsList from "../mediaItemsList/MediaItemsList";

function SearchPage(props) {
  const currentPage = useSelector(state => state.data.currentPage);
  const dataSearch = useSelector(state => state.data.dataSearch);
  const dispatch = useDispatch();
  const mediaCatalogRef = useRef();
  const savedPage = useRef();

  useEffect(() => {
    if(savedPage.current !== undefined) {
      savedPage.current = currentPage;
      updateData(currentPage);
      goTo(mediaCatalogRef.current);
    }
  }, [currentPage]);

  useEffect(() => {
    updateData(1);
    savedPage.current = 1;
    dispatch(setDataFilters(null));
  }, [dataSearch]);

  const updateData = (currentPage = 1) => {
    if (dataSearch) {
      const { dataType, searchValue } = dataSearch;
      dispatch(fetchData({fetchType: 'searchedData', dataType, currentPage, searchValue}));
    } else {
      dispatch(resetData());
    }
    goTo();
  };

  return (
    <div className="page">
      <MainBanner />

      <div ref={mediaCatalogRef} className="media-catalog">
        <div className="container">
          <div className="media-catalog__title title">Search results</div>

          <div className="media-catalog__body">
            <MediaItemsList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
