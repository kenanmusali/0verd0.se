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
import Zoom from '../elements/zoom'
import Download from '../elements/download'
import Footer from '../elements/footer'

const Sidebar = ({ onImageUpload }) => {
    const [showDitherLinks, setShowDitherLinks] = useState(false)
    const [currentDitherMethod, setCurrentDitherMethod] = useState('BITMAP')

    const handleDitherClick = () => {
        setShowDitherLinks(true)
    }

    const handleMethodSelect = (method) => {
        // Always close the menu when any method is clicked
        setShowDitherLinks(false)
        // Always update the current method
        setCurrentDitherMethod(method)
    }

    // If dither links are shown, only display Mark and DitherLinks
    if (showDitherLinks) {
        return (
            <div className='SidebarGroup' style={{ whiteSpace: 'pre' }}>
                <div className="Section">
                    <Mark />
                    <DitherLinks 
                        onMethodSelect={handleMethodSelect}
                        currentMethod={currentDitherMethod} // Make sure this is passed!
                    />
                </div>
            </div>
        )
    }

    // Normal view
    return (
        <div className='SidebarGroup' style={{ whiteSpace: 'pre' }}>
            <div className="Section">
                <Mark />
                <Upload onImageUpload={onImageUpload} />
                <Palette />
                <Dither 
                    onDitherClick={handleDitherClick}
                    currentMethod={currentDitherMethod} // Make sure this is passed!
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
                <Size />
                <Zoom />
                <Download />
                <Footer />
            </div>
        </div>
    )
}

export default Sidebar