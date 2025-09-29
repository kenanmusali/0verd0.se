import React, { useState } from 'react'

const SizeLinks = ({ onMethodSelect, currentMethod = 'MAX: 1000PX' }) => {
    const methods = ['MAX: 300PX', 'MAX: 500PX', 'MAX: 800PX','MAX: 1000PX', 'MAX: 1500PX','MAX: 2000PX']
    const [hoveredMethod, setHoveredMethod] = useState(null)

    const handleClick = (method) => {
        onMethodSelect(method)
    }

    // Function to remove "MAX: " from display
    const getDisplayText = (method) => {
        return method.replace('MAX: ', '')
    }

    return (
        <div className="Text-Group">
            <p style={{ whiteSpace: 'pre' }}>
                SIZE(RESOLUTION):{'\n'}
                {methods.map((method) => (
                    <span key={method}>
                        <span
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleClick(method)}
                            onMouseEnter={() => setHoveredMethod(method)}
                            onMouseLeave={() => setHoveredMethod(null)}
                        >
                            {method === currentMethod
                                ? hoveredMethod === method
                                    ? `>(${getDisplayText(method)})`
                                    : `>[${getDisplayText(method)}]`
                                : hoveredMethod === method
                                    ? `> ${getDisplayText(method)} `
                                    : `  ${getDisplayText(method)} `}
                        </span>
                        {'\n'}
                    </span>
                ))}
            </p>
        </div>
    )
}

export default SizeLinks