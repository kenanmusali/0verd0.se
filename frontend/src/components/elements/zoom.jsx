import React, { useState, useRef } from 'react'

const Zoom = ({ zoomLevel, onZoomIn, onZoomOut }) => {
    const [isHoveredOut, setIsHoveredOut] = useState(false);
    const [isHoveredIn, setIsHoveredIn] = useState(false);
    const holdIntervalRef = useRef(null);
    const clickTimeoutRef = useRef(null);

    const handleZoomOutStart = (e) => {
        e.preventDefault();
        
        // Set a timeout to detect if this becomes a hold
        clickTimeoutRef.current = setTimeout(() => {
            // This is a hold - start 1% increments
            holdIntervalRef.current = setInterval(() => {
                onZoomOut(true);
            }, 100);
        }, 300); // Wait 300ms to determine if it's a hold
        
        // Don't trigger the 10% click immediately
    };

    const handleZoomInStart = (e) => {
        e.preventDefault();
        
        // Set a timeout to detect if this becomes a hold
        clickTimeoutRef.current = setTimeout(() => {
            // This is a hold - start 1% increments
            holdIntervalRef.current = setInterval(() => {
                onZoomIn(true);
            }, 100);
        }, 300); // Wait 300ms to determine if it's a hold
        
        // Don't trigger the 10% click immediately
    };

    const handleZoomEnd = (e) => {
        e.preventDefault();
        
        // Clear the hold detection timeout
        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
            clickTimeoutRef.current = null;
        }
        
        // If no hold interval was started, this was a click - trigger 10% change
        if (!holdIntervalRef.current) {
            if (e.type.includes('mouse') || e.type.includes('touch')) {
                const isZoomIn = e.currentTarget === e.currentTarget.parentElement.lastElementChild;
                if (isZoomIn) {
                    onZoomIn(false);
                } else {
                    onZoomOut(false);
                }
            }
        }
        
        // Clear the hold interval
        if (holdIntervalRef.current) {
            clearInterval(holdIntervalRef.current);
            holdIntervalRef.current = null;
        }
    };

    return (
        <div className="Text-Group">
            <p style={{ whiteSpace: 'pre' }}>
                ZOOM:{'\n'}
                <span 
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                    onMouseDown={handleZoomOutStart}
                    onMouseUp={handleZoomEnd}
                    onMouseLeave={handleZoomEnd}
                    onTouchStart={handleZoomOutStart}
                    onTouchEnd={handleZoomEnd}
                    onContextMenu={(e) => e.preventDefault()}
                    onMouseEnter={() => setIsHoveredOut(true)}
                    onMouseLeave={() => setIsHoveredOut(false)}
                >
                    {isHoveredOut ? '(-)' : '[-]'}
                </span> {Math.round(zoomLevel * 100)}% <span 
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                    onMouseDown={handleZoomInStart}
                    onMouseUp={handleZoomEnd}
                    onMouseLeave={handleZoomEnd}
                    onTouchStart={handleZoomInStart}
                    onTouchEnd={handleZoomEnd}
                    onContextMenu={(e) => e.preventDefault()}
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