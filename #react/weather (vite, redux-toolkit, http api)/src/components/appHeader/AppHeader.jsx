import SearchForm from "../searchForm/SearchForm";
import "./appHeader.scss";
import logo from "./logo.svg";

const AppHeader = (props) => {
  return(
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <img src={logo} alt="logo" />
          <span className="header__logo-text">
            <span>IK-Coding</span>
            <span>weather</span>
          </span>
        </div>

        <SearchForm />
      </div>
    </div>
  );
};
export default AppHeader;