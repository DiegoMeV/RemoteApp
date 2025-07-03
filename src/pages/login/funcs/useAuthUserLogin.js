import { useAuthUser } from '@/libV4'
import toast from 'react-hot-toast'

const useAuthUserLogin = (onSuccessLogin) => {
  const { mutateAsync: login, isPending: loadingPushLogin } = useAuthUser({
    onSuccess: () => {
      onSuccessLogin()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || e?.message || 'Error al iniciar sesión')
    },
  })
  return { login, loadingPushLogin }
}
export default useAuthUserLogin
