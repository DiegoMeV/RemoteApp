import { downloadBuffer } from '@/lib'
import toast from 'react-hot-toast'

export const handleDownloadReport = async (getBufferReport, infoRow, coordinates) => {
  let body = { ...infoRow }
  delete body?.coordenadas_departamento
  delete body?.coordenadas_municipio
  try {
    const response = await getBufferReport({
      body: { data: { ...body, coordenadas: coordinates }, tipo: 'docx' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    downloadBuffer(response)
  } catch (error) {
    toast.error(error)
  }
}
