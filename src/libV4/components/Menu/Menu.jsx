import { useState } from 'react'

import { RecursiveMenu } from './components'

const Menu = ({ items, handleClick, handleOpenChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(null)
  return (
    <div className='z-10 h-full w-full'>
      <RecursiveMenu
        items={items}
        handleClick={handleClick}
        handleOpenChange={handleOpenChange}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </div>
  )
}

export default Menu
