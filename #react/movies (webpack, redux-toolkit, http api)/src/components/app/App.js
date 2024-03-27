import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Spinner from "../appSpinner/AppSpinner";
import Header from "../appHeader/AppHeader";
import Footer from "../appFooter/AppFooter";
import './app.scss';

const MainPage = lazy(() => import("../pages/MainPage"));
const MediaCatalogPage = lazy(() => import("../pages/MediaCatalogPage"));
const SinglePage = lazy(() => import("../pages/SinglePage"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const ActorPage = lazy(() => import("../pages/ActorPage"));

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <div className="main">
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/movie" element={<MediaCatalogPage dataType="movie" pageTitle="Movies catalog" />} />
              <Route path="/tv" element={<MediaCatalogPage dataType="tv" pageTitle="TV-Shows catalog" />} />
              <Route path="/movie/:id" element={<SinglePage dataType="movie" />} />
              <Route path="/tv/:id" element={<SinglePage dataType="tv" />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/:id" element={<ActorPage />} />
            </Routes>
          </Suspense>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;