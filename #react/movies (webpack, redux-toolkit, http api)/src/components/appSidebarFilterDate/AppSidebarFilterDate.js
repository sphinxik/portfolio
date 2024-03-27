import { useState, useEffect, useRef } from "react";
import ReactSlider from "react-slider";

function AppSidebarFilterDate({ dataType }) {
  const defaultDateRange = [1965, new Date().getFullYear()];

  const [datesRange, setDatesRange] = useState(defaultDateRange);
  const refDateSlider = useRef();
  const refDateFromInput = useRef();
  const refDateToInput = useRef();

  useEffect(() => {
    refDateSlider.current.state.value = defaultDateRange;
    setDatesRange(defaultDateRange);
  }, [dataType]);

  return (
    <div className="sidebar-filters__date-range">
      <ReactSlider
        ref={refDateSlider}
        className="sidebar-filters__date-slider range-slider"
        thumbClassName="range-slider__thumb"
        trackClassName="range-slider__track"
        //defaultValue={datesRange}
        min={defaultDateRange[0]}
        max={defaultDateRange[1]}
        pearling
        minDistance={0}
        onChange={(values, index) => {
          refDateFromInput.current.value = values[0];
          refDateToInput.current.value = values[1];
        }}
        onAfterChange={(values, index) => {
          setDatesRange(values);
        }}
      />

      <div className="sidebar-filters__date-range-row">
        <input className="sidebar-filters__date-input" ref={refDateFromInput} type="text" name="dateFrom" value={datesRange[0]} readOnly />
        <input className="sidebar-filters__date-input" ref={refDateToInput} type="text" name="dateTo" value={datesRange[1]} readOnly />
      </div>
    </div>
  );
}

export default AppSidebarFilterDate;
