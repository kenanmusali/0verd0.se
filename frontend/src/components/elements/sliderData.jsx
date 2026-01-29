import React from 'react';
import useSlider from '../../hooks/useSlider';

const SliderData = () => {
    const { sliderValues, handleSliderChange } = useSlider();

    return {
        name: "Resolution",
        Component: (
            <div className="Slider-Section">
                <div className="Slider-Description">
                    <p>Resolution</p>
                    <p>{Number(sliderValues.exposure).toFixed(2)}</p>
                </div>
                <div className="Slider-Input">
                    <input
                        type="range"
                        min={-10}
                        max={10}
                        step={0.01}
                        value={sliderValues.exposure}
                        onChange={(e) => handleSliderChange('exposure', e.target.value)}
                        className="slider"
                        style={{
                            "--percent": `${((sliderValues.exposure - (-10)) / (10 - (-10))) * 100}%`
                        }}
                    />
                </div>
            </div>
        )
    };
}

export default SliderData;