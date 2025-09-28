import React, { useState } from 'react'

const Dither = ({ onDitherClick, currentMethod = 'BITMAP' }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div className="Text-Group">
            <p style={{ whiteSpace: 'pre' }}>
                DITHERING METHOD:{'\n'}
                <span 
                    style={{ cursor: 'pointer' }}
                    onClick={onDitherClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isHovered ? `(${currentMethod})` : `[${currentMethod}]`}
                </span>
            </p>
        </div>
    )
}

export default Dither