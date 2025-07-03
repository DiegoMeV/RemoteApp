import { useMagicLink } from '@/libV4'
import toast from 'react-hot-toast'

const useMagicLinkLogin = () => {
  const { mutateAsync: loginMagicLink, isPending: loadingMagicLink } = useMagicLink({
    onSuccess: () => {
      toast.success(
        'Por favor, revise su correo electrónico para acceder al enlace de autenticación.'
      )
    },
    onError: (e) => {
      toast.error(
        e?.response?.data?.error ??
          'Ocurrió un error al validar la verificación de seguridad. Intente nuevamente.'
      )
    },
  })
  return { loginMagicLink, loadingMagicLink }
}
export default useMagicLinkLogin
