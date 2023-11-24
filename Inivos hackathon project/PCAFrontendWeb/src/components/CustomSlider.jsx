import React, { useState } from "react";

const CustomSlider = (props) => {
  const [sliderValue, setSliderValue] = useState(props.threshold); // Initial value

  props.onValueChange(sliderValue);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor="slider">Power Threshold (Units): {sliderValue}</label>
      <input
        className="custom-range"
        type="range"
        id="slider"
        name="slider"
        min={0}
        max={999}
        value={sliderValue}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default CustomSlider;
