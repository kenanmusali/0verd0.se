import React, { useRef, useEffect, useState } from 'react';

const Canva = ({ image, onImageDrop, canvaSize, zoomLevel, offset, onOffsetChange, onAutoCenter }) => {
    const canvasRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [currentOffset, setCurrentOffset] = useState(offset);

    useEffect(() => {
        setCurrentOffset(offset);
    }, [offset]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !image) return;

        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate scaled dimensions
        const scaledWidth = image.width * zoomLevel;
        const scaledHeight = image.height * zoomLevel;
        
        // Calculate center position with offset
        const centerX = (canvas.width - scaledWidth) / 2 + currentOffset.x;
        const centerY = (canvas.height - scaledHeight) / 2 + currentOffset.y;
        
        // Draw the image with zoom
        ctx.drawImage(image, centerX, centerY, scaledWidth, scaledHeight);
    }, [image, canvaSize, zoomLevel, currentOffset]);

    // Handle drop event
    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            onImageDrop(files[0]);
            onAutoCenter(); // Auto-center when new image is dropped
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Check if image is near center (within 20px threshold)
    const isNearCenter = (offsetX, offsetY, canvasWidth, canvasHeight) => {
        const threshold = 20;
        return Math.abs(offsetX) < threshold && Math.abs(offsetY) < threshold;
    };

    // Mouse down for panning
    const handleMouseDown = (e) => {
        if (image) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - currentOffset.x,
                y: e.clientY - currentOffset.y
            });
        }
    };

    // Mouse move for panning
    const handleMouseMove = (e) => {
        if (isDragging && image) {
            const newOffset = {
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            };
            setCurrentOffset(newOffset);
        }
    };

    // Mouse up for panning with auto-center detection
    const handleMouseUp = () => {
        if (isDragging && image) {
            setIsDragging(false);
            
            // Check if we should auto-center
            const canvas = canvasRef.current;
            if (canvas && isNearCenter(currentOffset.x, currentOffset.y, canvas.width, canvas.height)) {
                onAutoCenter();
            } else {
                onOffsetChange(currentOffset);
            }
        }
    };

    // Double click to auto-center
    const handleDoubleClick = () => {
        if (image) {
            onAutoCenter();
        }
    };

    // Use canvaSize dimensions if available, otherwise default to 800x600 or image dimensions
    const width = canvaSize.width > 0 ? canvaSize.width : (image ? image.width : 800);
    const height = canvaSize.height > 0 ? canvaSize.height : (image ? image.height : 600);

    return (
        <canvas
            ref={canvasRef}
            className="Canva"
            width={width}
            height={height}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onDoubleClick={handleDoubleClick}
            style={{ 
                cursor: isDragging ? 'grabbing' : (image ? 'grab' : 'default'),
                background: 'transparent'
            }}
            title="Drag to pan, double-click to center"
        />
    );
};

export default Canva;