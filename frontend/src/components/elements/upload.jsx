import React, { useRef, useState } from 'react'

const Upload = ({ onImageUpload }) => {
    const fileInputRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)

    const handleClick = () => {
        // Create a temporary file input
        const fileInput = document.createElement('input')
        fileInput.type = 'file'
        fileInput.accept = '.png,.jpg,.jpeg,.webp'
        fileInput.style.display = 'none'
        
        fileInput.onchange = (e) => {
            const file = e.target.files[0]
            if (file && onImageUpload) {
                onImageUpload(file)
            }
        }
        
        document.body.appendChild(fileInput)
        fileInput.click()
        document.body.removeChild(fileInput)
    }

    return (
        <div className="Text-Group">
            <p 
                style={{ whiteSpace: 'pre', cursor: 'pointer' }} 
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                PNG, JPG, WEBP:{'\n'}
                {isHovered ? '(UPLOAD FILE)' : '[UPLOAD FILE]'}
            </p>
        </div>
    )
}

export default Upload