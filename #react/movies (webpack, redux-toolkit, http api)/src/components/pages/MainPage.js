import { useEffect } from "react";

import { goTo } from "../../utils/Utils";

import MainBanner from "../mainBanner/MainBanner";
import TopRatedSlider from "../topRatedSlider/TopRatedSlider";

function MainPage(props) {
  useEffect(() => {
    goTo();
  }, []);

  return (
    <div className="page">
      <MainBanner />
      <TopRatedSlider dataType="movie" sliderTitle="TOP-20 movies" />
      <TopRatedSlider dataType="tv" sliderTitle="TOP-20 tv-shows" />
    </div>
  )
}

export default MainPage;