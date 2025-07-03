import { ClassicIconButton, stringToObject } from '@/lib'
import { CheckCircle } from '@mui/icons-material'

const CircleCheck = ({ handleClick, data, params }) => {
  const themeApp = stringToObject(import.meta.env.VITE_THEME_APPLICATION, 'VITE_THEME_APPLICATION')
  const isMatch = data?.data?.find((item) => {
    return item?.privilegeId === params?.row?.id || item?.roleId === params?.row?.id
  })
  return (
    <ClassicIconButton
      title='Asignar'
      color={isMatch ? 'success' : 'secondary'}
      hoverColor={themeApp.primary || '#1a73e8'}
      onClick={() => {
        handleClick()
      }}
    >
      <CheckCircle />
    </ClassicIconButton>
  )
}

export default CircleCheck
