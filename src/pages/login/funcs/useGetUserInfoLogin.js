import { useUserInfo } from '@/libV4'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const useGetUserInfo = () => {
  //TODO : implement logic for check if user has privilege console
  const hasPrivilegeConsole = true
  const navigate = useNavigate()

  const { mutateAsync: getInfoUser, isPending: loadingSetUserInfo } = useUserInfo({
    onSuccess: (response) => {
      toast.success('Inicio de sesión exitoso')
      const companies = response?.data?.[0]?.companies ?? []

      if (hasPrivilegeConsole) {
        navigate(companies.length > 1 ? '/selectCompany' : '/companies')
        return
      }
      navigate('/companies', undefined, { scroll: false })
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  return { getInfoUser, loadingSetUserInfo }
}
export default useGetUserInfo
