import React from 'react'
import Info from '../elements/info'
import Export from '../elements/export'
import Layers from '../elements/layerImage'

import Effects from '../ui/effects'
import Filters from '../ui/filters'

const Sidebar = () => {
  return (
    <div className='Sidebar'>
      <div className="Sidebar-Items">
        <Info />
        <Export />
        {/* <Layers /> */}
        <Effects />
        <Filters />
      </div>
    </div>
  )
}

export default Sidebar


