import React from 'react'
import ChevronIcon from '../../assets/svg/chevron.svg'
import usePopups from '../../hooks/usePopups'

const Popups = ({ Items, Title }) => {
    const [isOpen, toggleSection, position, popupRef, triggerRef] = usePopups(false)

    return (
        <div className='Section-Group' ref={triggerRef}>
            <div className="Section-Top">
                <p className='Section-Header'>{Title}</p>
                <div
                    className="Section-Select"
                    onClick={toggleSection}
                >
                    <img
                        className={`Section-Icon ${isOpen ? 'rotated' : ''}`}
                        src={ChevronIcon}
                        alt="chevron"
                    />
                </div>
            </div>

            {isOpen && (
                <div
                    className="Section-Popup"   
                    ref={popupRef}
                >
                    {Items}
                </div>
            )}
        </div>
    )
}

export default Popups