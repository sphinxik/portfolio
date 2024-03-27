import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { addToLocalStorage } from "../../utils";

import AppHeader from "../appHeader/AppHeader";
import AppBannerBg from "../appBannerBg/AppBannerBg";
import AppMainContent from "../appMainContent/AppMainContent";
import AppFooter from "../appFooter/AppFooter";

const App = () => {
  const [appTheme, setAppTheme] = useState("dark");

  useEffect(() => {
    if (localStorage.getItem("ikcTodoTheme")) {
      const lsData = localStorage.getItem("ikcTodoTheme");
      setAppTheme(lsData);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = appTheme;
    addToLocalStorage("ikcTodoTheme", appTheme);
  }, [appTheme]);

  const switchAppTheme = () => {
    const newTheme = appTheme === "dark" ? "light" : "dark";
    setAppTheme(newTheme);
  };

  return (
    <Router>
      <div className="app">
        <AppHeader switchAppTheme={switchAppTheme} />
        <main className="main">
          <AppBannerBg />
          <AppMainContent />
        </main>
        <AppFooter />
      </div>
    </Router>
  );
};

export default App;
