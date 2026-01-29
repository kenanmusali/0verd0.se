import { useState, useCallback } from 'react';

export const useImageActions = () => {
  const [images, setImages] = useState([]);
  const [activeImageId, setActiveImageId] = useState(null);

  // Add images from upload
  const setUploadedImages = useCallback((newImages) => {
    setImages(prev => [...prev, ...newImages]);
    if (newImages.length > 0 && !activeImageId) {
      setActiveImageId(newImages[0].id);
    }
  }, [activeImageId]);

  // Delete image
  const deleteImage = useCallback((id) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      // Clean up URL
      const deletedImg = prev.find(img => img.id === id);
      if (deletedImg) {
        URL.revokeObjectURL(deletedImg.url);
      }
      return filtered;
    });
    
    if (activeImageId === id) {
      setActiveImageId(images.length > 1 ? images[0].id : null);
    }
  }, [activeImageId, images.length]);

  // Rename image
  const renameImage = useCallback((id, newName) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, name: newName } : img
    ));
  }, []);

  // Toggle lock
  const toggleLock = useCallback((id) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, isLocked: !img.isLocked } : img
    ));
  }, []);

  // Bring to front
  const bringToFront = useCallback((id) => {
    setImages(prev => {
      const maxZ = Math.max(...prev.map(img => img.zIndex));
      return prev.map(img => 
        img.id === id ? { ...img, zIndex: maxZ + 1 } : img
      );
    });
  }, []);

  // Send to back
  const sendToBack = useCallback((id) => {
    setImages(prev => {
      const minZ = Math.min(...prev.map(img => img.zIndex));
      return prev.map(img => 
        img.id === id ? { ...img, zIndex: minZ - 1 } : img
      );
    });
  }, []);

  // Replace image
  const replaceImage = useCallback((id, newFile) => {
    const newUrl = URL.createObjectURL(newFile);
    setImages(prev => prev.map(img => {
      if (img.id === id) {
        // Clean up old URL
        URL.revokeObjectURL(img.url);
        return { 
          ...img, 
          url: newUrl,
          name: newFile.name.replace(/\.[^/.]+$/, "") || img.name
        };
      }
      return img;
    }));
  }, []);

  // Make full screen
  const makeFullScreen = useCallback((id) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { 
        ...img, 
        size: { width: 800, height: 600 },
        position: { x: 0, y: 0 }
      } : img
    ));
  }, []);

  // Update image position/size
  const updateImage = useCallback((id, updates) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, ...updates } : img
    ));
  }, []);

  return {
    images,
    activeImageId,
    setActiveImageId,
    setUploadedImages,
    deleteImage,
    renameImage,
    toggleLock,
    bringToFront,
    sendToBack,
    replaceImage,
    makeFullScreen,
    updateImage
  };
};