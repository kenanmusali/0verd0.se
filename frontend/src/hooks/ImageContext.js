import React, { createContext, useContext, useReducer, useCallback } from 'react';

const ImageContext = createContext();

// Action types
const ADD_IMAGE = 'ADD_IMAGE';
const DELETE_IMAGE = 'DELETE_IMAGE';
const RENAME_IMAGE = 'RENAME_IMAGE';
const TOGGLE_LOCK = 'TOGGLE_LOCK';
const BRING_TO_FRONT = 'BRING_TO_FRONT';
const SEND_TO_BACK = 'SEND_TO_BACK';
const UPDATE_IMAGE = 'UPDATE_IMAGE';
const REPLACE_IMAGE = 'REPLACE_IMAGE';
const SET_ACTIVE = 'SET_ACTIVE';

const imageReducer = (state, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return {
        ...state,
        images: [...state.images, action.payload],
        activeId: action.payload.id
      };
    
    case DELETE_IMAGE:
      return {
        ...state,
        images: state.images.filter(img => img.id !== action.payload),
        activeId: state.images.length > 1 ? state.images[0].id : null
      };
    
    case RENAME_IMAGE:
      return {
        ...state,
        images: state.images.map(img =>
          img.id === action.payload.id
            ? { ...img, name: action.payload.name }
            : img
        )
      };
    
    case TOGGLE_LOCK:
      return {
        ...state,
        images: state.images.map(img =>
          img.id === action.payload
            ? { ...img, isLocked: !img.isLocked }
            : img
        )
      };
    
    case BRING_TO_FRONT:
      const maxZ = Math.max(...state.images.map(img => img.zIndex));
      return {
        ...state,
        images: state.images.map(img =>
          img.id === action.payload
            ? { ...img, zIndex: maxZ + 1 }
            : img
        ).sort((a, b) => a.zIndex - b.zIndex)
      };
    
    case SEND_TO_BACK:
      const minZ = Math.min(...state.images.map(img => img.zIndex));
      return {
        ...state,
        images: state.images.map(img =>
          img.id === action.payload
            ? { ...img, zIndex: minZ - 1 }
            : img
        ).sort((a, b) => a.zIndex - b.zIndex)
      };
    
    case UPDATE_IMAGE:
      return {
        ...state,
        images: state.images.map(img =>
          img.id === action.payload.id
            ? { ...img, ...action.payload.updates }
            : img
        )
      };
    
    case REPLACE_IMAGE:
      return {
        ...state,
        images: state.images.map(img =>
          img.id === action.payload.id
            ? { 
                ...img, 
                url: action.payload.url,
                name: action.payload.name || img.name
              }
            : img
        )
      };
    
    case SET_ACTIVE:
      return {
        ...state,
        activeId: action.payload
      };
    
    default:
      return state;
  }
};

export const ImageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(imageReducer, {
    images: [],
    activeId: null
  });

  const addImage = useCallback((file) => {
    const id = Date.now().toString();
    const url = URL.createObjectURL(file);
    
    // Check if it's the first image for full screen
    const isFirstImage = state.images.length === 0;
    
    const newImage = {
      id,
      name: file.name.replace(/\.[^/.]+$/, "") || 'Untitled',
      url,
      fileSize: file.size,
      format: file.type.split('/')[1].toUpperCase(),
      position: {
        x: isFirstImage ? 0 : Math.random() * 100,
        y: isFirstImage ? 0 : Math.random() * 100,
      },
      size: {
        width: isFirstImage ? 800 : 300,
        height: isFirstImage ? 600 : 200,
      },
      isLocked: false,
      zIndex: state.images.length,
    };

    dispatch({ type: ADD_IMAGE, payload: newImage });
    return id;
  }, [state.images.length]);

  const deleteImage = useCallback((id) => {
    dispatch({ type: DELETE_IMAGE, payload: id });
  }, []);

  const renameImage = useCallback((id, name) => {
    dispatch({ type: RENAME_IMAGE, payload: { id, name } });
  }, []);

  const toggleLock = useCallback((id) => {
    dispatch({ type: TOGGLE_LOCK, payload: id });
  }, []);

  const bringToFront = useCallback((id) => {
    dispatch({ type: BRING_TO_FRONT, payload: id });
  }, []);

  const sendToBack = useCallback((id) => {
    dispatch({ type: SEND_TO_BACK, payload: id });
  }, []);

  const updateImage = useCallback((id, updates) => {
    dispatch({ type: UPDATE_IMAGE, payload: { id, updates } });
  }, []);

  const replaceImage = useCallback((id, file) => {
    const url = URL.createObjectURL(file);
    dispatch({ 
      type: REPLACE_IMAGE, 
      payload: { 
        id, 
        url,
        name: file.name.replace(/\.[^/.]+$/, "") || 'Untitled'
      } 
    });
  }, []);

  const setActiveImage = useCallback((id) => {
    dispatch({ type: SET_ACTIVE, payload: id });
  }, []);

  const makeFullScreen = useCallback((id) => {
    updateImage(id, {
      position: { x: 0, y: 0 },
      size: { width: 800, height: 600 }
    });
  }, [updateImage]);

  return (
    <ImageContext.Provider value={{
      images: state.images,
      activeId: state.activeId,
      addImage,
      deleteImage,
      renameImage,
      toggleLock,
      bringToFront,
      sendToBack,
      updateImage,
      replaceImage,
      setActiveImage,
      makeFullScreen
    }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);