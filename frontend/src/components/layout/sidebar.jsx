import React, { useState } from 'react'
import Mark from '../elements/mark'
import Upload from '../elements/upload'
import Palette from '../elements/palette'
import Dither from '../elements/dither'
import DitherLinks from '../links/dither'
import Factor from '../elements/factor'
import Scale from '../elements/scale'
import Threshold from '../elements/threshold'
import Hightlights from '../elements/hightlights'
import Depth from '../elements/depth'
import Midtones from '../elements/midtones'
import Blur from '../elements/blur'
import Size from '../elements/size'
import SizeLinks from '../links/size' // Add this import
import Zoom from '../elements/zoom'
import Download from '../elements/download'
import Footer from '../elements/footer'

const Sidebar = ({ 
    onImageUpload, 
    zoomLevel, 
    onZoomIn, 
    onZoomOut, 
    onSizeChange, // Add this prop
    currentSize = 'MAX: 1000PX' // Add default size
}) => {
    const [showDitherLinks, setShowDitherLinks] = useState(false)
    const [showSizeLinks, setShowSizeLinks] = useState(false) // Add this state
    const [currentDitherMethod, setCurrentDitherMethod] = useState('BITMAP')

    const handleDitherClick = () => {
        setShowDitherLinks(true)
        setShowSizeLinks(false) // Close size links if open
    }

    const handleSizeClick = () => {
        setShowSizeLinks(true)
        setShowDitherLinks(false) // Close dither links if open
    }

    const handleMethodSelect = (method) => {
        setShowDitherLinks(false)
        setCurrentDitherMethod(method)
    }

    const handleSizeSelect = (size) => {
        setShowSizeLinks(false)
        onSizeChange(size) // Call the parent handler
    }

    if (showDitherLinks) {
        return (
            <div className='SidebarGroup' style={{ whiteSpace: 'pre' }}>
                <div className="Section">
                    <Mark />
                    <DitherLinks 
                        onMethodSelect={handleMethodSelect}
                        currentMethod={currentDitherMethod}
                    />
                </div>
            </div>
        )
    }

    if (showSizeLinks) {
        return (
            <div className='SidebarGroup' style={{ whiteSpace: 'pre' }}>
                <div className="Section">
                    <Mark />
                    <SizeLinks 
                        onMethodSelect={handleSizeSelect}
                        currentMethod={currentSize}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className='SidebarGroup' style={{ whiteSpace: 'pre' }}>
            <div className="Section">
                <Mark />
                <Upload onImageUpload={onImageUpload} />
                <Palette />
                <Dither 
                    onDitherClick={handleDitherClick}
                    currentMethod={currentDitherMethod}
                />
                <Factor />
                <Scale />
                <Threshold />
                <Hightlights />
                <Depth />
                <Midtones />
                <Blur />
            </div>

            <div className="Section">
                <Size onSizeClick={handleSizeClick} currentSize={currentSize} />
                <Zoom 
                    zoomLevel={zoomLevel}
                    onZoomIn={onZoomIn}
                    onZoomOut={onZoomOut}
                />
                <Download />
                <Footer />
            </div>
        </div>
    )
}

export default Sidebar