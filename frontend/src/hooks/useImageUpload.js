import { useState, useCallback } from 'react';

export const useImageUpload = () => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleFileUpload = useCallback((files) => {
    const newImages = Array.from(files).map(file => {
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      
      return new Promise((resolve) => {
        img.onload = () => {
          resolve({
            id: Date.now() + Math.random(),
            name: file.name.replace(/\.[^/.]+$/, "") || 'Untitled',
            url: imageUrl,
            fileSize: file.size,
            format: file.type.split('/')[1].toUpperCase() || 'JPG',
            width: img.naturalWidth,
            height: img.naturalHeight,
            isLocked: false,
            zIndex: uploadedImages.length,
            position: { x: 0, y: 0 }
          });
        };
        img.src = imageUrl;
      });
    });

    Promise.all(newImages).then(images => {
      // First image gets full screen, others get smaller
      const processedImages = images.map((img, index) => {
        if (index === 0 && uploadedImages.length === 0) {
          return {
            ...img,
            size: { width: 800, height: 600 }
          };
        }
        return {
          ...img,
          size: { width: 300, height: 200 },
          position: {
            x: index * 50,
            y: index * 50
          }
        };
      });
      
      setUploadedImages(prev => [...prev, ...processedImages]);
    });
  }, [uploadedImages.length]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  return {
    uploadedImages,
    handleFileUpload,
    handleDrop,
    handleDragOver
  };
};