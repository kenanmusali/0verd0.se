// useImageManipulation.js
import { useState, useCallback, useEffect, useRef } from 'react';

const useImageManipulation = () => {
  const [images, setImages] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeInfo = useRef({ handle: '', startX: 0, startY: 0, startWidth: 0, startHeight: 0 });

  const handleMouseDown = useCallback((e, imageId, type = 'drag', handle = '') => {
    e.stopPropagation();
    
    if (type === 'drag') {
      isDragging.current = true;
      const img = images.find(img => img.id === imageId);
      if (img && !img.locked) {
        dragOffset.current = {
          x: e.clientX - img.x,
          y: e.clientY - img.y
        };
      }
    } else if (type === 'resize') {
      isResizing.current = true;
      const img = images.find(img => img.id === imageId);
      if (img) {
        resizeInfo.current = {
          handle,
          startX: e.clientX,
          startY: e.clientY,
          startWidth: img.width,
          startHeight: img.height,
          aspectRatio: img.width / img.height
        };
      }
    }
  }, [images]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging.current && selectedImageId) {
      const img = images.find(img => img.id === selectedImageId);
      if (img && !img.locked) {
        const newX = e.clientX - dragOffset.current.x;
        const newY = e.clientY - dragOffset.current.y;
        
        setImages(prev => prev.map(img => 
          img.id === selectedImageId 
            ? { ...img, x: newX, y: newY }
            : img
        ));
      }
    }
    
    if (isResizing.current && selectedImageId) {
      const img = images.find(img => img.id === selectedImageId);
      if (img) {
        const { handle, startX, startY, startWidth, startHeight, aspectRatio } = resizeInfo.current;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        let newWidth = startWidth;
        let newHeight = startHeight;
        
        switch (handle) {
          case 'bottom-right':
            newWidth = startWidth + deltaX;
            newHeight = startHeight + deltaY;
            break;
          case 'bottom-left':
            newWidth = Math.max(10, startWidth - deltaX);
            newHeight = startHeight + deltaY;
            break;
          case 'top-right':
            newWidth = startWidth + deltaX;
            newHeight = Math.max(10, startHeight - deltaY);
            break;
          case 'top-left':
            newWidth = Math.max(10, startWidth - deltaX);
            newHeight = Math.max(10, startHeight - deltaY);
            break;
        }
        
        // Maintain aspect ratio if shift key is pressed
        if (e.shiftKey) {
          if (handle.includes('right') || handle.includes('left')) {
            newHeight = newWidth / aspectRatio;
          } else {
            newWidth = newHeight * aspectRatio;
          }
        }
        
        setImages(prev => prev.map(img => 
          img.id === selectedImageId 
            ? { ...img, width: newWidth, height: newHeight }
            : img
        ));
      }
    }
  }, [images, selectedImageId]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    isResizing.current = false;
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return {
    images,
    setImages,
    selectedImageId,
    setSelectedImageId,
    handleMouseDown
  };
};

export default useImageManipulation;