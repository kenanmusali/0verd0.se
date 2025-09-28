import React from 'react'
import Credit from './credit'
import Info from './info'
import Account from './account'

const Footer = () => {
    return (
        <div className="Text-Group">
            <p style={{ whiteSpace: 'pre' }}>
                <Credit />
                <Info />
                <Account />
            </p>
        </div>
    )
}

export default Footer