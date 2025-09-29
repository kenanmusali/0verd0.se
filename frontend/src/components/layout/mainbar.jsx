import React from 'react'
import Canva from '../elements/canva'
import Notification from '../elements/notification'

const Mainbar = ({ image, imageDetails, onImageRemove, onImageDrop, canvaSize, zoomLevel, offset, onOffsetChange, onAutoCenter }) => {
  return (
    <div className='MainbarGroup'>
      <Canva 
        image={image} 
        onImageDrop={onImageDrop} 
        canvaSize={canvaSize}
        zoomLevel={zoomLevel}
        offset={offset}
        onOffsetChange={onOffsetChange}
        onAutoCenter={onAutoCenter}
      />
      <Notification 
        imageDetails={imageDetails} 
        onImageRemove={onImageRemove} 
      />
    </div>
  )
}

export default Mainbar