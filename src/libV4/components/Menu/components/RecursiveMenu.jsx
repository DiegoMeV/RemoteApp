import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useState } from 'react'
import { List } from '@mui/material'

const MenuItem = ({ item, handleClick, handleOpenChange, selectedIndex, setSelectedIndex }) => {
  const [open, setOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0
  const onClick = (item) => {
    setSelectedIndex(item.key)
    if (!hasChildren && !item.isParent) {
      handleClick(item)
      return
    }
    setOpen(!open)
    handleOpenChange(item)
  }

  return (
    <>
      <ListItemButton
        selected={selectedIndex === item.key}
        onClick={() => onClick(item)}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.label} />
        {(hasChildren || item.isParent) && (
          <span>{open ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}</span>
        )}
      </ListItemButton>

      {hasChildren && open && (
        <div className='pl-4'>
          <RecursiveMenu
            items={item.children}
            handleClick={handleClick}
            handleOpenChange={handleOpenChange}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        </div>
      )}
    </>
  )
}

const RecursiveMenu = ({
  items,
  handleClick,
  handleOpenChange,
  selectedIndex,
  setSelectedIndex,
}) => {
  return (
    <List className='w-full'>
      {items.map((item) => (
        <MenuItem
          key={item.key}
          item={item}
          handleClick={handleClick}
          handleOpenChange={handleOpenChange}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      ))}
    </List>
  )
}

export default RecursiveMenu
