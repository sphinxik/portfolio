import { useState, useEffect, useRef } from "react";
import ReactSlider from "react-slider";

function AppSidebarFilterRating({ dataType }) {
  const defaultRating = 6;

  const [rating, setRating] = useState(defaultRating);
  const refRatingSlider = useRef();

  useEffect(() => {
    refRatingSlider.current.state.value = [defaultRating];
    setRating(defaultRating);
  }, [dataType]);

  return(
    <>
      <input type="hidden" name="rating" value={rating} />
      <ReactSlider
        ref={refRatingSlider}
        className="sidebar-filters__rating-slider range-slider range-slider--oneThumb"
        thumbClassName="range-slider__thumb"
        trackClassName="range-slider__track"
        //defaultValue={rating}
        min={0}
        max={10}
        pearling
        minDistance={0}
        renderThumb={(props, state) => (
          <div {...props}>
            <span>{state.valueNow}</span>
          </div>
        )}
        onAfterChange={(values, index) => {
          setRating(values);
        }}
      />
    </>
  );
};
export default AppSidebarFilterRating