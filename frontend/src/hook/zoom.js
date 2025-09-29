import { useState, useCallback } from 'react';

const useZoom = () => {
    const [zoomLevel, setZoomLevel] = useState(1); // Default 30%
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const zoomIn = useCallback(() => {
        setZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 3)); // Max 300%
        autoCenter();
    }, []);

    const zoomOut = useCallback(() => {
        setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.1)); // Min 10%
        autoCenter();
    }, []);

    const resetZoom = useCallback(() => {
        setZoomLevel(1.0); // Reset to 30%
        autoCenter();
    }, []);

    const setOffsetPosition = useCallback((newOffset) => {
        setOffset(newOffset);
    }, []);

    const autoCenter = useCallback(() => {
        setOffset({ x: 0, y: 0 });
    }, []);

    // Auto-center when zoom level changes significantly
    const smartZoom = useCallback((newZoomLevel) => {
        setZoomLevel(newZoomLevel);
        // Auto-center only if the zoom change is substantial
        if (Math.abs(newZoomLevel - zoomLevel) > 0.5) {
            autoCenter();
        }
    }, [zoomLevel]);

    return {
        zoomLevel,
        offset,
        zoomIn,
        zoomOut,
        resetZoom,
        setZoomLevel: smartZoom,
        setOffsetPosition,
        autoCenter
    };
};

export default useZoom;