import React from 'react'
import ChevronIcon from '../../assets/svg/chevron.svg'
import useToggle from '../../hooks/useToggle'


const Section = ({ elements, header }) => {
    const [isOpen, toggleSection] = useToggle(false)

    return (
        <div className='Section-Group'>
            <div className="Section-Top">
                <p className='Section-Header'>{header}</p>
                <div className="Section-Select" onClick={toggleSection}>
                    <img
                        className={`Section-Icon ${isOpen ? 'rotated' : ''}`}
                        src={ChevronIcon}
                        alt="chevron"
                    />
                </div>
            </div>
            <div className={`Section-Bottom ${isOpen ? 'open' : 'closed'}`}>
                <div className="line"></div>
                {elements}
            </div>
        </div>
    )
}

export default Section