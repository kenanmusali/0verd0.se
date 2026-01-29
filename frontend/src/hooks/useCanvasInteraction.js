import { useState, useCallback } from 'react';

export const useCanvasInteraction = (images, updateImage, setActiveImageId) => {
  const [dragging, setDragging] = useState(null);
  const [resizing, setResizing] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ width: 0, height: 0 });

  const handleMouseDown = useCallback((e, imageId, action = 'move') => {
    e.stopPropagation();
    setActiveImageId(imageId);
    const image = images.find(img => img.id === imageId);
    
    if (image.isLocked) return;
    
    if (action === 'resize') {
      setResizing(imageId);
      setResizeStart({
        width: image.size.width,
        height: image.size.height,
        x: e.clientX,
        y: e.clientY
      });
    } else {
      setDragging(imageId);
      setDragStart({
        x: e.clientX - image.position.x,
        y: e.clientY - image.position.y
      });
    }
  }, [images, setActiveImageId]);

  const handleMouseMove = useCallback((e) => {
    if (dragging) {
      const image = images.find(img => img.id === dragging);
      if (!image.isLocked) {
        updateImage(dragging, {
          position: {
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
          }
        });
      }
    }
    
    if (resizing) {
      const image = images.find(img => img.id === resizing);
      if (!image.isLocked) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        
        updateImage(resizing, {
          size: {
            width: Math.max(50, resizeStart.width + deltaX),
            height: Math.max(50, resizeStart.height + deltaY)
          }
        });
      }
    }
  }, [dragging, resizing, images, dragStart, resizeStart, updateImage]);

  const handleMouseUp = useCallback(() => {
    setDragging(null);
    setResizing(null);
  }, []);

  return {
    dragging,
    resizing,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  };
};