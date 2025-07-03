import { useGlobalVariables } from '@/libV4/hooks'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useLocation } from 'react-router-dom'
import { exportOptions } from './constants'
import { ButtonNavbar } from './components'

const OptionsNavbar = ({ validateDirtyForm }) => {
  const { pathname } = useLocation()
  const clearSelectedOption = useStoreActions((actions) => actions.menu.clearSelectedOption)
  const userData = useStoreState((state) => state.user.userData)
  const getGlobalVariables = useGlobalVariables()
  const { taxt_id } = getGlobalVariables({})
  const { leftOptions, rightOptions } = exportOptions({
    params: { taxt_id },
    superSaiyayin: userData?.superSaiyayin,
  })

  return (
    <div className='flex justify-between w-full'>
      <div className='flex pl-5 gap-x-5'>
        {leftOptions.map((option, index) => (
          <ButtonNavbar
            key={index}
            option={option}
            pathname={pathname}
            validateDirtyForm={validateDirtyForm}
            clearSelectedOption={clearSelectedOption}
          />
        ))}
      </div>
      <div className='flex pl-5 gap-x-5'>
        {rightOptions.map((option, index) => (
          <ButtonNavbar
            key={index}
            option={option}
            pathname={pathname}
            validateDirtyForm={validateDirtyForm}
            clearSelectedOption={clearSelectedOption}
          />
        ))}
      </div>
    </div>
  )
}

export default OptionsNavbar
