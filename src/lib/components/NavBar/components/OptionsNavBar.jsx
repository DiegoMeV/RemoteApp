import { Box } from '@mui/material'
import { optionsContainer } from '../styles/stylesSx'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { exportOptions } from '../constants'
import ButtonNavbar from './ButtonNavbar'
import { useGlobalVaribles } from '@/lib/hooks'
import { useLocation } from 'react-router-dom'

const OptionsNavBar = ({ validateDirtyForm }) => {
  const { pathname } = useLocation()
  const clearSelectedOption = useStoreActions((actions) => actions.menu.clearSelectedOption)
  const getGlobalVariables = useGlobalVaribles()
  const { taxt_id } = getGlobalVariables({})
  const userData = useStoreState((state) => state.user.userData)
  const { leftOptions, rightOptions } = exportOptions({
    params: { taxt_id },
    superSaiyayin: userData?.superSaiyayin,
  })
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      width='100%'
    >
      <Box sx={optionsContainer}>
        {leftOptions.map((option, index) => (
          <ButtonNavbar
            key={index}
            option={option}
            pathname={pathname}
            validateDirtyForm={validateDirtyForm}
            clearSelectedOption={clearSelectedOption}
          />
        ))}
      </Box>
      <Box sx={optionsContainer}>
        {rightOptions.map((option, index) => (
          <ButtonNavbar
            key={index}
            option={option}
            pathname={pathname}
            validateDirtyForm={validateDirtyForm}
            clearSelectedOption={clearSelectedOption}
          />
        ))}
      </Box>
    </Box>
  )
}

export default OptionsNavBar
