// hooks/useSlider.js
import { useState } from 'react'

const useSlider = () => {
    const [sliderValues, setSliderValues] = useState({
        exposure: 0.10,
        brightness: 2.5,
        contrast: 2.5,
        highlights: 2.5,
        depth: 2.5,
        blur: 0,
        shadows: 0,
    })

    const handleSliderChange = (id, value) => {
        setSliderValues(prev => ({
            ...prev,
            [id]: parseFloat(value) // Convert string to number
        }))
    }

    return {
        sliderValues,
        handleSliderChange
    }
}

export default useSlider