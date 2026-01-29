// EffectTypeAscii.jsx
import React from 'react'
import SwooshIcon from '../../assets/svg/check.svg'

const EffectTypeAscii = () => {
    return {
        name: "Effect Presets",
        Selected: "Classic ASCII",
        List:
            <div className='Popups-Section-Group'>
                <div className="Popups-Section-List">
                    <p className='Section-Header'>ASCwII</p>
                    <div className="Popups-Section-Select">
                        <img src={SwooshIcon} />
                    </div>
                </div>
                <div className="Popups-Section-List">
                 <p className='Section-Header'>ASCwII</p>
                    <div className="Popups-Section-Select">
                        <img src={SwooshIcon} />
                    </div>
                </div>
                <div className="Popups-Section-List">
                 <p className='Section-Header'>ASCwII</p>
                    <div className="Popups-Section-Select">
                        <img src={SwooshIcon} />
                    </div>
                </div>
            </div>
    };
}

export default EffectTypeAscii