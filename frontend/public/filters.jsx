import React from 'react'
import Section from '../src/components/ux/section'
import useSlider from '../src/hooks/useSlider'

const Filters = () => {
    const { sliderValues, handleSliderChange } = useSlider()

    const sliders = [
        {
            id: 'exposure',
            label: 'Exposure',
            min: -10,
            max: 10,
            step: 0.01,
            value: sliderValues.exposure
        },
        {
            id: 'brightness',
            label: 'Brightness',
            min: -10,
            max: 10,
            step: 1,
            value: sliderValues.brightness
        },
        {
            id: 'contrast',
            label: 'Contrast',
            min: -10,
            max: 10,
            step: 0.1,
            value: sliderValues.contrast

        },
        {
            id: 'highlights',
            label: 'Highlights',
            min: -10,
            max: 10,
            step: 0.1,
            value: sliderValues.highlights
        },
        {
            id: 'depth',
            label: 'Depth',
            min: 0,
            max: 10,
            step: 0.1,
            value: sliderValues.depth
        },
        {
            id: 'blur',
            label: 'Blur',
            min: 0,
            max: 10,
            step: 1,
            value: sliderValues.blur
        },
        {
            id: 'shadows',
            label: 'Shadows',
            min: 0,
            max: 10,
            step: 0.1,
            value: sliderValues.shadows
        }
    ]

    return (
        <Section
            header="Filters"
            elements={
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
            }
        />
    )
}

export default Filters