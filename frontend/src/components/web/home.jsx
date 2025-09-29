import React, { useState } from 'react'
import Sidebar from '../layout/sidebar'
import Mainbar from '../layout/mainbar'
import useCanvaSize from '../../hook/canvaSize'
import useZoom from '../../hook/zoom'

const Home = () => {
    const [currentImage, setCurrentImage] = useState(null)
    const [imageDetails, setImageDetails] = useState(null)
    const [currentSize, setCurrentSize] = useState('MAX: 1000PX') // Add current size state
    const { canvaSize, updateCanvaSize, resetCanvaSize, calculateResizedDimensions, changeMaxSize } = useCanvaSize()
    const { zoomLevel, zoomIn, zoomOut, resetZoom, offset, setOffsetPosition, autoCenter } = useZoom()

    const handleImageUpload = (file) => {
        if (file) {
            const img = new Image()
            img.onload = () => {
                // Get current max size from the size string
                const maxSize = getMaxSizeFromString(currentSize);
                
                // Calculate resized dimensions first
                const resized = calculateResizedDimensions(img.width, img.height, maxSize);
                
                // Create resized image using canvas
                const canvas = document.createElement('canvas');
                canvas.width = resized.width;
                canvas.height = resized.height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, resized.width, resized.height);
                
                // Create new image from resized canvas
                const resizedImg = new Image();
                resizedImg.onload = () => {
                    // Update canvas size state
                    updateCanvaSize(img.width, img.height, maxSize);
                    
                    const details = {
                        name: file.name,
                        width: resized.width,
                        height: resized.height,
                        originalWidth: img.width,
                        originalHeight: img.height,
                        file: file,
                        wasResized: resized.wasResized
                    }
                    setImageDetails(details)
                    setCurrentImage(resizedImg)
                    // Reset zoom and center when new image is loaded
                    resetZoom()
                    autoCenter()
                };
                resizedImg.src = canvas.toDataURL();
            }
            img.src = URL.createObjectURL(file)
        }
    }

    // Helper function to extract max size from string
    const getMaxSizeFromString = (sizeString) => {
        const match = sizeString.match(/MAX: (\d+)PX/);
        return match ? parseInt(match[1]) : 1000;
    };

    const handleSizeChange = (size) => {
        setCurrentSize(size);
        const newMaxSize = getMaxSizeFromString(size);
        
        // If we have an image, resize it with the new max size
        if (currentImage && imageDetails) {
            changeMaxSize(size);
            
            // Recalculate dimensions with new max size
            const resized = calculateResizedDimensions(
                imageDetails.originalWidth, 
                imageDetails.originalHeight, 
                newMaxSize
            );
            
            // Create resized image using canvas
            const canvas = document.createElement('canvas');
            canvas.width = resized.width;
            canvas.height = resized.height;
            
            const ctx = canvas.getContext('2d');
            
            // Draw the original image (we need to reload it to avoid quality loss)
            const originalImg = new Image();
            originalImg.onload = () => {
                ctx.drawImage(originalImg, 0, 0, resized.width, resized.height);
                
                // Create new image from resized canvas
                const resizedImg = new Image();
                resizedImg.onload = () => {
                    // Update image details
                    const updatedDetails = {
                        ...imageDetails,
                        width: resized.width,
                        height: resized.height,
                        wasResized: resized.wasResized
                    };
                    setImageDetails(updatedDetails);
                    setCurrentImage(resizedImg);
                    
                    // Reset zoom and center after resize
                    resetZoom();
                    autoCenter();
                };
                resizedImg.src = canvas.toDataURL();
            };
            originalImg.src = URL.createObjectURL(imageDetails.file);
        } else {
            // Just update the max size for future images
            changeMaxSize(size);
        }
    }

    const handleImageRemove = () => {
        setCurrentImage(null)
        setImageDetails(null)
        resetCanvaSize()
        resetZoom()
        autoCenter()
    }

    const handleDrop = (file) => {
        handleImageUpload(file)
    }

    const handleOffsetChange = (newOffset) => {
        setOffsetPosition(newOffset);
    };

    return (
        <div className='Container'>
            <Sidebar 
                onImageUpload={handleImageUpload} 
                zoomLevel={zoomLevel}
                onZoomIn={zoomIn}
                onZoomOut={zoomOut}
                onSizeChange={handleSizeChange} // Add this prop
                currentSize={currentSize} // Add this prop
            />
            <Mainbar 
                image={currentImage} 
                imageDetails={imageDetails}
                onImageRemove={handleImageRemove}
                onImageDrop={handleDrop}
                canvaSize={canvaSize}
                zoomLevel={zoomLevel}
                offset={offset}
                onOffsetChange={handleOffsetChange}
                onAutoCenter={autoCenter}
            />
        </div>
    )
}

export default Home