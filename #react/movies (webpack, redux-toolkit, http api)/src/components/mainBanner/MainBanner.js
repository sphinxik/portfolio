import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setDataSearch } from "../../slices/dataSlice";

import './mainBanner.scss';
import bannerImg from '../../assets/img/banner.jpg';

function MainBanner() {
  const dataSearch = useSelector(state => state.data.dataSearch);
  const location = useLocation();
  const naviagate = useNavigate();
  const dispatch = useDispatch();
  const inputSearchDefaultValue = (dataSearch && location.pathname === '/search') ? dataSearch.searchValue : '';

  useEffect(() => {
    if(dataSearch && location.pathname !== '/search') {
      dispatch(setDataSearch(null));
    }
  }, [location]);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formResult = Object.fromEntries([...formData]);

    if(formResult.searchValue !== '') {
      dispatch(setDataSearch(formResult));
      naviagate("/search");
    }
  }

  return (
    <section className="main-banner _animateIn">
      <div className="main-banner__bg">
        <img src={bannerImg} alt="" />
      </div>
      <div className="container">
        <div className="main-banner__content">
          <h1 className="main-banner__title"></h1>
          <form className="search-form" onSubmit={onSearchSubmit}>
            <div className="search-form__row">
              <input className="search-form__input" type="text" name="searchValue" 
                                                                placeholder="Search for movies and tv-shows"  
                                                                autoComplete="off" 
                                                                defaultValue={inputSearchDefaultValue}/>
              <button className="search-form__btn" type="submit">Search</button>
            </div>
            <div className="search-form__radios">
              <label className="radio-label">
                <input className="radio-input" type="radio" name="dataType" value="movie" defaultChecked />
                <span className="radio-custom"></span>
                <span className="radio-txt">Movies and cartoons</span>
              </label>
              <label className="radio-label">
                <input className="radio-input" type="radio" name="dataType" value="tv" />
                <span className="radio-custom"></span>
                <span className="radio-txt">TV-Shows</span>
              </label>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default MainBanner;