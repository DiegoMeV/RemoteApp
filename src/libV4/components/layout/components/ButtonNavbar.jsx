import { Button, Typography } from '@mui/material'
import { AccessControl } from '../../AccessControl'
import { buttonsNavBar } from '../styles/stylesSx'
import { useRootStore } from '@/libV4/store'

const ButtonNavbar = ({ option, pathname, validateDirtyForm, clearSelectedOption }) => {
  const { menuSelected } = useRootStore()

  const handleClickOption = () => {
    const actions = [
      { condition: option.newTab, action: () => window.open(option.path, '_blank') },
      {
        condition: option.path === '/applications' && menuSelected?.path,
        action: () => validateDirtyForm(menuSelected?.path ?? option.path),
      },
      {
        condition: pathname !== option.path,
        action: () => validateDirtyForm(option.path),
      },

      { condition: pathname === '/inbox', action: clearSelectedOption },
    ]

    actions.find(({ condition }) => condition)?.action()
  }

  return (
    <AccessControl
      key={option.label}
      privilege={option.privilege ?? ''}
    >
      <Button
        key={option.label}
        sx={buttonsNavBar(pathname.includes(option.path))}
        onClick={handleClickOption}
      >
        <option.icon />
        <Typography>{option.label}</Typography>
      </Button>
    </AccessControl>
  )
}

export default ButtonNavbar
