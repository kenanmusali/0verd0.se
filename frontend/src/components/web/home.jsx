import React, { useState } from 'react'
import Sidebar from '../layout/sidebar'
import Mainbar from '../layout/mainbar'
import useCanvaSize from '../../hook/canvaSize'
import useZoom from '../../hook/zoom'

const Home = () => {
    const [currentImage, setCurrentImage] = useState(null)
    const [imageDetails, setImageDetails] = useState(null)
    const { canvaSize, updateCanvaSize, resetCanvaSize, calculateResizedDimensions } = useCanvaSize()
    const { zoomLevel, zoomIn, zoomOut, resetZoom, offset, setOffsetPosition, autoCenter } = useZoom()

    const handleImageUpload = (file) => {
        if (file) {
            const img = new Image()
            img.onload = () => {
                // Calculate resized dimensions first
                const resized = calculateResizedDimensions(img.width, img.height);
                
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
                    updateCanvaSize(img.width, img.height);
                    
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