import { useState, useCallback } from 'react';

const useZoom = () => {
    const [zoomLevel, setZoomLevel] = useState(1); // Default 100%
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const zoomIn = useCallback((isHold = false) => {
        if (isHold) {
            // Hold: increase by 1%
            setZoomLevel(prevZoom => Math.min(prevZoom + 0.01, 3)); // Max 300%
        } else {
            // Click: round to nearest 10% and increase by 10%
            const currentPercent = Math.round(zoomLevel * 100);
            const baseTen = Math.floor(currentPercent / 10) * 10;
            const newPercent = Math.min(baseTen + 10, 300);
            setZoomLevel(newPercent / 100);
        }
        autoCenter();
    }, [zoomLevel]);

    const zoomOut = useCallback((isHold = false) => {
        if (isHold) {
            // Hold: decrease by 1%
            setZoomLevel(prevZoom => Math.max(prevZoom - 0.01, 0.1)); // Min 10%
        } else {
            // Click: round to nearest 10% and decrease by 10%
            const currentPercent = Math.round(zoomLevel * 100);
            const baseTen = Math.floor(currentPercent / 10) * 10;
            const newPercent = Math.max(baseTen - 10, 10);
            setZoomLevel(newPercent / 100);
        }
        autoCenter();
    }, [zoomLevel]);

    const resetZoom = useCallback(() => {
        setZoomLevel(1.0); // Reset to 100%
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