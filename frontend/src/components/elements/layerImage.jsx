// EffectTypeAscii.jsx
import React from 'react'
import TrashIcon from '../../assets/svg/trash.svg'
import LockIcon from '../../assets/svg/lock.svg'
import UnlockIcon from '../../assets/svg/unlock.svg'
import ChangeIcon from '../../assets/svg/change.svg'
import RenameIcon from '../../assets/svg/rename.svg'
import SendToBackIcon from '../../assets/svg/send-to-back.svg'
import BringToFrontIcon from '../../assets/svg/bring-to-front.svg'

const layerImage = () => {
    return {
        Selected: "Image",
        List:
            <div className='Popups-Section-Group'>
                <div className="Popups-Section-List">
             <p className='Section-Header'>Rename</p>
                   <div className="Popups-Section-Select">
                        <img src={RenameIcon} />
                    </div>
                </div>
                <div className="Popups-Section-List">
                <p className='Section-Header'>Change</p>
                    <div className="Popups-Section-Select">
                        <img src={ChangeIcon} />
                    </div>
                </div>
                <div className="Popups-Section-List">
                  <p className='Section-Header'>Lock</p>
                    <div className="Popups-Section-Select">
                        <img src={LockIcon} />
                    </div>
                </div>
                <div className="Popups-Section-List">
                  <p className='Section-Header'>Send to back</p>
                    <div className="Popups-Section-Select">
                        <img src={SendToBackIcon} />
                    </div>
                </div>
                <div className="Popups-Section-List">
                  <p className='Section-Header'>Bring to front</p>
                    <div className="Popups-Section-Select">
                        <img src={BringToFrontIcon} />
                    </div>
                </div>
                <div className="Popups-Section-List">
                  <p className='Section-Header'>Delete</p>
                    <div className="Popups-Section-Select">
                        <img src={TrashIcon} />
                    </div>
                </div>
            </div>
    };
}

export default layerImage

