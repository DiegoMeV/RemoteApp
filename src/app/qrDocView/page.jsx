import { QrDocView } from './view'
import { useEffect, useState } from 'react'
import { useQrDocumentInfo } from '@/lib'
import toast from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'

const QrDoc = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const tk = searchParams.get('tk')
  const di = searchParams.get('di')
  const ci = searchParams.get('ci')
  const idCompany = searchParams.get('idCompany')

  const [qrDocumentInfo, setQrDocumentInfo] = useState({})

  const {
    mutateAsync: getQrDocument,
    isPending: loadingQrDoc,
    isError: errorQrDoc,
  } = useQrDocumentInfo({
    di: di,
    tk: tk,
    idCompany: idCompany,
    onSuccess: (response) => {
      toast.success('Solicitud de informacion exitosa')
      setQrDocumentInfo(response?.data[0] ?? {})
    },
    onError: (e) =>
      toast.error(
        e?.response?.data?.error ?? 'El documento no existe, no se pudo obtener información.'
      ),
  })

  useEffect(() => {
    if (tk && di && idCompany) {
      getQrDocument()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tk, di, idCompany, navigate])

  if (!tk || !di || !idCompany) {
    toast.error('Hace falta informacion para realizar la consulta del documento')
    navigate('/')
    return null
  }

  return (
    <QrDocView
      commentId={ci}
      qrDocumentInfo={qrDocumentInfo}
      loadingQrDoc={loadingQrDoc}
      errorQrDoc={errorQrDoc}
    />
  )
}

export default QrDoc
