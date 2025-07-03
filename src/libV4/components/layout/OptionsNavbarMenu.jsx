import { useGlobalVariables } from '@/libV4/hooks'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useState } from 'react'
import { exportOptions } from './constants'
import { useLocation } from 'react-router-dom'
import { BasicListItem, ClassicIconButton } from '@/libV4/ui'
import MenuIcon from '@mui/icons-material/Menu'
import { Menu } from '@mui/material'

const OptionsNavbarMenu = ({ validateDirtyForm }) => {
  const { pathname } = useLocation()
  const clearSelectedOption = useStoreActions((actions) => actions.menu.clearSelectedOption)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const userData = useStoreState((state) => state.user.userData)
  const getGlobalVariables = useGlobalVariables()
  const { taxt_id } = getGlobalVariables({})
  const { leftOptions } = exportOptions({
    params: { taxt_id },
    superSaiyayin: userData?.superSaiyayin,
  })

  const handleClickOption = (option) => {
    const actions = [
      { condition: option.newTab, action: () => window.open(option.path, '_blank') },
      { condition: pathname !== option.path, action: () => validateDirtyForm(option.path) },
      { condition: pathname === '/inbox', action: clearSelectedOption },
    ]

    actions.find(({ condition }) => condition)?.action()
  }

  return (
    <div className='absolute left-2'>
      <ClassicIconButton onClick={handleClick}>
        <MenuIcon fontSize='large' />
      </ClassicIconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {leftOptions?.map((option, index) => (
          <BasicListItem
            key={index}
            icon={<option.icon />}
            label={option.label}
            privilege={option.privilege}
            onClick={() => handleClickOption(option)}
          />
        ))}
      </Menu>
    </div>
  )
}

export default OptionsNavbarMenu
