import React from 'react'
import Canva from '../elements/canva'
import Notification from '../elements/notification'

const Mainbar = ({ image, imageDetails, onImageRemove, onImageDrop, canvaSize }) => {
  return (
    <div className='MainbarGroup'>
      <Canva 
        image={image} 
        onImageDrop={onImageDrop} 
        canvaSize={canvaSize}
      />
      <Notification 
        imageDetails={imageDetails} 
        onImageRemove={onImageRemove} 
      />
    </div>
  )
}

export default Mainbar