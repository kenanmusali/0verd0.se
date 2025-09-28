// hooks/canvaSize.js
import { useState, useCallback } from 'react';

const useCanvaSize = () => {
    const [canvaSize, setCanvaSize] = useState({ 
        width: 0, 
        height: 0,
        originalWidth: 0,
        originalHeight: 0,
        wasResized: false
    });

    const calculateResizedDimensions = useCallback((width, height) => {
        const maxSize = 1000;
        
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

    const updateCanvaSize = useCallback((width, height) => {
        const resized = calculateResizedDimensions(width, height);
        
        setCanvaSize({ 
            width: resized.width, 
            height: resized.height,
            originalWidth: width,
            originalHeight: height,
            wasResized: resized.wasResized
        });

        return resized;
    }, [calculateResizedDimensions]);

    const resetCanvaSize = useCallback(() => {
        setCanvaSize({ 
            width: 0, 
            height: 0,
            originalWidth: 0,
            originalHeight: 0,
            wasResized: false
        });
    }, []);

    return {
        canvaSize,
        updateCanvaSize,
        resetCanvaSize,
        calculateResizedDimensions
    };
};

export default useCanvaSize;