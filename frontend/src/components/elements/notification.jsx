import React, { useState, useEffect } from 'react'

const Notification = ({ imageDetails, onImageRemove }) => {
    const [isHidden, setIsHidden] = useState(false)
    const [hasUploadedImage, setHasUploadedImage] = useState(false)

    // Reset hidden state when imageDetails changes (new image uploaded)
    useEffect(() => {
        if (imageDetails) {
            setIsHidden(false)
            setHasUploadedImage(true)
        }
    }, [imageDetails])

    const handleRemoveClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (onImageRemove) {
            onImageRemove()
        }
    }

    const handleHideClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsHidden(true)
    }

    // If notification is hidden, don't render anything
    if (isHidden) {
        return null
    }

    // Don't show default message if user has uploaded an image before
    if (!imageDetails && !hasUploadedImage) {
        return (
            <div className="Text-Group Notification-Group">
                <p style={{ whiteSpace: 'pre' }}>
                    (YOU CAN DRAG'N'DROP IMAGE ON SPACE)
                    <span 
                        onClick={handleHideClick}
                        onMouseEnter={(e) => e.target.textContent = '(X)'}
                        onMouseLeave={(e) => e.target.textContent = '[X]'}
                    >
                        [X]
                    </span>
                </p>
            </div>
        )
    }

    // If no image details but user has uploaded before, show nothing or empty state
    if (!imageDetails && hasUploadedImage) {
        return null
    }

    return (
        <div className="Text-Group Notification-Group">
            <p style={{ whiteSpace: 'pre' }}>
                ({imageDetails.width}X{imageDetails.height}PX)
                {imageDetails.wasResized && `(DEFAULT ${imageDetails.originalWidth}X${imageDetails.originalHeight}PX)`}
                ({imageDetails.name})
                <span 
                    onClick={handleRemoveClick}
                    onMouseDown={(e) => e.stopPropagation()}
                    onMouseEnter={(e) => e.target.textContent = '(X)'}
                    onMouseLeave={(e) => e.target.textContent = '[X]'}
                >
                    [X]
                </span>
            </p>
        </div>
    )
}

export default Notification