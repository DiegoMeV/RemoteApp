import { Button, Typography } from '@mui/material'
import { buttonsNavBar } from '../styles/stylesSx'
import { AccessControl } from '@/libV4'

const ButtonNavbar = ({ option, pathname, validateDirtyForm, clearSelectedOption }) => {
  const handleClickOption = () => {
    const actions = [
      { condition: option.newTab, action: () => window.open(option.path, '_blank') },
      { condition: pathname !== option.path, action: () => validateDirtyForm(option.path) },
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
        {option.icon}
        <Typography>{option.label}</Typography>
      </Button>
    </AccessControl>
  )
}

export default ButtonNavbar
