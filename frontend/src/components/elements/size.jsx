import React, { useState } from 'react'

const Size = ({ onSizeClick, currentSize = 'MAX: 1000PX' }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div 
            className="Text-Group" 
            onClick={onSizeClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <p style={{ whiteSpace: 'pre' }}>
                SIZE:{'\n'}
                {isHovered ? `(${currentSize})` : `[${currentSize}]`}
            </p>
        </div>
    )
}

export default Size