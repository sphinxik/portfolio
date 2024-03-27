import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setActiveDataGenres, setDataFilters } from '../../slices/filtersSlice';

import AppSidebarFilterSort from "../appSidebarFilterSort/AppSidebarFilterSort";
import AppSidebarFilterDate from "../appSidebarFilterDate/AppSidebarFilterDate";
import AppSidebarFilterGenres from "../appSidebarFilterGenres/AppSidebarFilterGenres";
import AppSidebarFilterRating from "../appSidebarFilterRating/AppSidebarFilterRating";
import "./appSidebar.scss";

function AppSidebar({ dataType }) {
  const dispatch = useDispatch();

  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('click', toggleMobileSidebar);
    return () => {
      document.removeEventListener('click', toggleMobileSidebar);
    }
  }, []);

  useEffect(() => {
    dispatch(setDataFilters(null));
    dispatch(setActiveDataGenres(""));
  }, [dataType]);

  const toggleMobileSidebar = (e) => {
    if(e.target.closest('.media-catalog__filter-btn')) {
      setSidebarMobileOpen(true);
    }

    if(e.target.closest('.sidebar-close__btn') || (!e.target.closest('.sidebar') && !e.target.closest('.media-catalog__filter-btn') && !e.target.closest('.sidebar-select__menu'))) {
      setSidebarMobileOpen(false);
    }
  }

  const onFiltersSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formResult = {};

    formData.forEach((value, key) => {
      if (key === "genres") {
        formResult[key] ? (formResult[key] += `|${value}`) : (formResult[key] = value);
      } else {
        formResult[key] = value;
      }
    });

    if (formResult.genres) {
      dispatch(setActiveDataGenres(formResult.genres));
    }

    setSidebarMobileOpen(false);
    dispatch(setDataFilters(formResult));
  };

  return (
    <aside className={"sidebar _animateIn " + (sidebarMobileOpen ? 'is-active' : '')}>
      <button className="sidebar-close__btn" type="button">
        <span></span>
        <span></span>
      </button>

      <form onSubmit={onFiltersSubmit} className="sidebar-filters">
        <div className="sidebar-filters__item">
          <div className="sidebar-filters__title">Sort by</div>
          <div className="sidebar-filters__item-body">
            <AppSidebarFilterSort dataType={dataType} />
          </div>
        </div>

        <div className="sidebar-filters__item">
          <div className="sidebar-filters__title">Release Dates</div>
          <div className="sidebar-filters__item-body">
            <AppSidebarFilterDate dataType={dataType} />
          </div>
        </div>

        <div className="sidebar-filters__item">
          <div className="sidebar-filters__title">Genres</div>
          <div className="sidebar-filters__item-body">
            <AppSidebarFilterGenres dataType={dataType} />
          </div>
        </div>

        <div className="sidebar-filters__item">
          <div className="sidebar-filters__title">Rating (min)</div>
          <div className="sidebar-filters__item-body">
            <AppSidebarFilterRating dataType={dataType} />
          </div>
        </div>

        <button className="sidebar-filters__btn" type="submit">Filter</button>
      </form>
    </aside>
  );
}

export default AppSidebar;