import { useSiifWeb } from '@/lib'
import toast from 'react-hot-toast'

const useSiifWebLogin = (onSuccessLogin) => {
  const { mutateAsync: loginSiifWeb, isPending: loadingSiifWeb } = useSiifWeb({
    onSuccess: () => {
      onSuccessLogin()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || e?.message || 'Error al iniciar sesión')
    },
  })
  return { loginSiifWeb, loadingSiifWeb }
}

export default useSiifWebLogin
