import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchData, setFavorites } from "../../actions";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useFreeToGamesService from "../../services/FreeToGameService";

import AppFooter from "../appFooter/AppFooter";
import AppHeader from "../appHeader/AppHeader";
import Homepage from "../pages/Homepage";
import Catalog from "../pages/Catalog";
import Card from "../pages/Card";
import Search from "../pages/Search";
import Favorites from "../pages/Favorites";
import "./app.scss";

function App() {
  const { getGamesList } = useFreeToGamesService();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(getGamesList));

    if(localStorage.getItem('ikcgames_favorites')) {
      const lsData = JSON.parse(localStorage.getItem('ikcgames_favorites'));
      dispatch(setFavorites(lsData));
    }
  }, []);

  const AnimatedPageSwitch = () => {
    const location = useLocation();

    return (
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} classNames="main" timeout={600} onExit={window.scrollTo(0, 0)}>
          <main className="main main-enter-done">
            <Routes location={location}>
              <Route path="/" element={<Homepage />} />
              <Route path="/catalog/" element={<Catalog />} />
              <Route path="/catalog/:id" element={<Card />} />
              <Route path="/search/" element={<Search />} />
              <Route path="/favorites/" element={<Favorites />} />
            </Routes>
          </main>
        </CSSTransition>
      </TransitionGroup>
    );
  }

  return (
    <Router>
      <div className="app">
        <AppHeader />
        <AnimatedPageSwitch />
        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
