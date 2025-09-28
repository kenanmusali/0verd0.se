import React, { useState } from 'react'

const DitherLinks = ({ onMethodSelect, currentMethod = 'BITMAP' }) => {
    const methods = ['BITMAP', 'ATKINSON',  ]
    const [hoveredMethod, setHoveredMethod] = useState(null)

    const handleClick = (method) => {
        onMethodSelect(method)
    }

    return (
        <div className="Text-Group">
            <p style={{ whiteSpace: 'pre' }}>
                DITHERING METHOD:{'\n'}
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
                                    ? `>(${method})`
                                    : `>[${method}]`
                                : hoveredMethod === method
                                    ? `> ${method} `
                                    : `  ${method} `}
                        </span>
                        {'\n'}
                    </span>
                ))}
            </p>
        </div>
    )
}

export default DitherLinks