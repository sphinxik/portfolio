import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from "../../slices/dataSlice";
import { goTo } from "../../utils/Utils";

import MainBanner from "../mainBanner/MainBanner";
import Sidebar from "../appSidebar/AppSidebar";
import MediaItemsList from "../mediaItemsList/MediaItemsList";

function MediaCatalogPage({ dataType, pageTitle }) {
  const currentPage = useSelector(state => state.data.currentPage);
  const dataFilters = useSelector(state => state.filters.dataFilters);
  const dispatch = useDispatch();
  const mediaCatalogRef = useRef();
  const savedPage = useRef();
  const savedFilters = useRef();

  useEffect(() => {
    if(savedPage.current !== undefined) {
      savedPage.current = currentPage;
      updateData(dataFilters, currentPage);
      goTo(mediaCatalogRef.current);
    }
  }, [currentPage]);

  useEffect(() => {
    if(dataFilters && savedFilters.current !== undefined) {
      savedFilters.current = dataFilters;
      updateData(dataFilters, 1);
      goTo(mediaCatalogRef.current);
    }
  }, [dataFilters]);

  useEffect(() => {
    updateData(null, 1);
    savedPage.current = 1;
    savedFilters.current = null;
    goTo();
  }, [dataType]);

  const updateData = (dataFilters, currentPage = 1) => {
    const fetchType = dataFilters ? 'filteredData' : 'defaultData';
    dispatch(fetchData({fetchType, dataType, currentPage, dataFilters}));
  };

  return (
    <div className="page">
      <MainBanner />

      <div ref={mediaCatalogRef} className="media-catalog">
        <div className="container">
          <div className="media-catalog__title title">{pageTitle}</div>

          <button className="media-catalog__filter-btn" type="button">Filters</button>

          <div className="media-catalog__inner">
            <Sidebar dataType={dataType} />

            <div className="media-catalog__body">
              <MediaItemsList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaCatalogPage;
