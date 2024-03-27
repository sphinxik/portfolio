import { TbSun, TbMoonStars } from 'react-icons/tb';

import "./appHeader.scss";
import logo from "./logo.svg"

const AppHeader = ({ switchAppTheme }) => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <a className="header-logo" href="/">
              <span className="header-logo__img">
                <img src={logo} alt="logo"/>
              </span>
              <span className="header-logo__text">
                IK-Coding
                <span>todo</span>
              </span>
            </a>

            <label className="header__theme-trigger theme-trigger">
              <input className="theme-trigger__checkbox" type="checkbox" onChange={switchAppTheme}/>
              <span className="theme-trigger__checkbox-custom">
                <span><TbSun /></span>
                <span><TbMoonStars /></span>
              </span>
            </label>
          </div>
        </div>
      </header>
    </>
  );
};

export default AppHeader;