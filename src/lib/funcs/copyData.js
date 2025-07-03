import toast from 'react-hot-toast'
export const copyClipboard = (textCopied) => {
  if (textCopied) {
    navigator.clipboard
      .writeText(textCopied)
      .then(() => {
        toast.success('El texto ha sido copiado')
      })
      .catch((error) => {
        toast.error(error)
      })
  }
}
