// hooks/canvaSize.js
import { useState, useCallback } from 'react';

const useCanvaSize = () => {
    const [canvaSize, setCanvaSize] = useState({ 
        width: 0, 
        height: 0,
        originalWidth: 0,
        originalHeight: 0,
        wasResized: false,
        maxSize: 1000 // Add maxSize to state
    });

    const getMaxSizeFromString = useCallback((sizeString) => {
        const match = sizeString.match(/MAX: (\d+)PX/);
        return match ? parseInt(match[1]) : 1000;
    }, []);

    const calculateResizedDimensions = useCallback((width, height, maxSize = 1000) => {
        if (width <= maxSize && height <= maxSize) {
            return {
                width,
                height,
                wasResized: false
            };
        }

        const scaleFactor = Math.min(maxSize / width, maxSize / height);
        const newWidth = Math.floor(width * scaleFactor);
        const newHeight = Math.floor(height * scaleFactor);

        return {
            width: newWidth,
            height: newHeight,
            wasResized: true
        };
    }, []);

    const updateCanvaSize = useCallback((width, height, maxSize = 1000) => {
        const resized = calculateResizedDimensions(width, height, maxSize);
        
        setCanvaSize({ 
            width: resized.width, 
            height: resized.height,
            originalWidth: width,
            originalHeight: height,
            wasResized: resized.wasResized,
            maxSize: maxSize
        });

        return resized;
    }, [calculateResizedDimensions]);

    const changeMaxSize = useCallback((sizeString) => {
        const newMaxSize = getMaxSizeFromString(sizeString);
        
        // If we have an image, recalculate dimensions with new max size
        if (canvaSize.originalWidth > 0 && canvaSize.originalHeight > 0) {
            updateCanvaSize(canvaSize.originalWidth, canvaSize.originalHeight, newMaxSize);
        } else {
            setCanvaSize(prev => ({
                ...prev,
                maxSize: newMaxSize
            }));
        }
        
        return newMaxSize;
    }, [canvaSize.originalWidth, canvaSize.originalHeight, updateCanvaSize, getMaxSizeFromString]);

    const resetCanvaSize = useCallback(() => {
        setCanvaSize({ 
            width: 0, 
            height: 0,
            originalWidth: 0,
            originalHeight: 0,
            wasResized: false,
            maxSize: 1000
        });
    }, []);

    return {
        canvaSize,
        updateCanvaSize,
        resetCanvaSize,
        changeMaxSize, // Add this function
        calculateResizedDimensions,
        getMaxSizeFromString
    };
};

export default useCanvaSize;