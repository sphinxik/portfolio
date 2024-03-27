import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setSearchValue } from '../../actions';

import './appSearchBar.scss'

const AppSearchBar = () => {
  const dispatch = useDispatch();
  const [searchInputValue, setSearchInputValue] = useState('');
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    setSearchInputValue(e.target.value);
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchValue(searchInputValue));
    navigate("/search");
  }

  return (
    <form className="search-bar__form" onSubmit={onFormSubmit} >
      <input className="search-bar__form-input form-input" autoComplete="off" type="search" name="search" placeholder="Search..." defaultValue={searchInputValue} onChange={onChangeInput} />
      <button className="search-bar__form-btn" type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
      </button>
    </form>
  );
};
export default AppSearchBar;