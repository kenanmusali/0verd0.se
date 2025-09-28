// elements/canva.js
import React, { useRef, useEffect } from 'react';

const Canva = ({ image, onImageDrop, canvaSize }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !image) return;

        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the image
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }, [image, canvaSize]);

    // Handle drop event
    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            onImageDrop(files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
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
            
        />
    );
};

export default Canva;