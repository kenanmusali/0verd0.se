// CustomCharacters.jsx
import React from 'react';

const CustomCharacters = () => {
    return {
        name: "Custom Characters",
        Component: (
            <div className="textarea-container">
                <textarea 
                    className="Section-Group-Textarea"
                    placeholder=".:-=+*#%@"
                    rows={1}
                />
            </div>
        )
    };
}

export default CustomCharacters;