import React, { useState } from 'react'

const Zoom = ({ zoomLevel, onZoomIn, onZoomOut }) => {
    const [isHoveredOut, setIsHoveredOut] = useState(false);
    const [isHoveredIn, setIsHoveredIn] = useState(false);

    const handleZoomOut = (e) => {
        e.preventDefault();
        onZoomOut();
    };

    const handleZoomIn = (e) => {
        e.preventDefault();
        onZoomIn();
    };

    return (
        <div className="Text-Group">
            <p style={{ whiteSpace: 'pre' }}>
                ZOOM:{'\n'}
                <span 
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                    onClick={handleZoomOut}
                    onMouseEnter={() => setIsHoveredOut(true)}
                    onMouseLeave={() => setIsHoveredOut(false)}
                >
                    {isHoveredOut ? '(-)' : '[-]'}
                </span> {Math.round(zoomLevel * 100)}% <span 
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                    onClick={handleZoomIn}
                    onMouseEnter={() => setIsHoveredIn(true)}
                    onMouseLeave={() => setIsHoveredIn(false)}
                >
                    {isHoveredIn ? '(+)' : '[+]'}
                </span>
            </p>
        </div>
    )
}

export default Zoom