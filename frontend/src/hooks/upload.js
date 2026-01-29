import React, { useCallback } from 'react';
import { useImageContext } from './ImageContext';
import Section from '../ux/section';
import UploadIcon from '../../assets/svg/upload.svg';

const Upload = () => {
  const { addImage } = useImageContext();
  
  const handleFileSelect = useCallback((event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        addImage(file);
      }
    });
  }, [addImage]);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const files = Array.from(event.dataTransfer.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        addImage(file);
      }
    });
  }, [addImage]);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return (
    <Section
      header="Upload File"
      elements={
        <div 
          className="Upload-Area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('file-input').click()}
          style={{ 
            cursor: 'pointer',
            border: '2px dashed #ccc',
            padding: '20px',
            textAlign: 'center',
            borderRadius: '8px'
          }}
        >
          <input
            id="file-input"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          
          <div className="Upload-Top">
            <img src={UploadIcon} alt="Upload" style={{ width: '48px', height: '48px' }}/>
            <p>DRAG & DROP OR CLICK TO UPLOAD</p>
            <p>JPG, JPEG, GIF, PNG, SVG</p>
          </div>
          
          <div className="Upload-Bottom" style={{ marginTop: '20px' }}>
            <div className="Description-items">
              <p>Supported Formats:</p>
              <p>JPG, JPEG, GIF, PNG, SVG</p>
            </div>
            <div className="Description-items">
              <p>Max Size:</p>
              <p>10MB per image</p>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Upload;