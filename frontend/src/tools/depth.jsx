import React from 'react'
import useSlider from '../hooks/useSlider'

const Depth = () => {
    const { sliderValues, handleSliderChange } = useSlider()
    
    console.log('useSlider returns:', { sliderValues, handleSliderChange })
    
    const availableKeys = Object.keys(sliderValues)
    console.log('Available keys in sliderValues:', availableKeys)

    const sliders = [
        {
            id:   'depth', 
            label: 'Depth',
            min: -10,
            max: 10,
            step: 0.1,
            value:   sliderValues.depth || 0
        },
    ]

    return {
        Component: (
            <>
                {sliders.map(slider => (
                    <div key={slider.id} className="Slider-Section">
                        <div className="Slider-Description">
                            <p>{slider.label}</p>
                            <p>{Number(slider.value).toFixed(2)}</p>
                        </div>
                        <div className="Slider-Input">
                            <input
                                type="range"
                                min={slider.min}
                                max={slider.max}
                                step={slider.step}
                                value={slider.value}
                                onChange={(e) => handleSliderChange(slider.id, e.target.value)}
                                className="slider"
                                style={{
                                    "--percent": `${((slider.value - slider.min) / (slider.max - slider.min)) * 100}%`
                                }}
                            />
                        </div>
                    </div>
                ))}
            </>
        )
    }
}

export default Depth