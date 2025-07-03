import { formatDate } from '@/app/inbox/requirements/[idGroup]/funcs'
import { MagicString, toArray } from '@/lib'
import toast from 'react-hot-toast'

export const infoRequirementsBody = (stepSelect, idTypeProcess, SIGEDOC) => {
  const processData = {
    additionalData: [{ id: 'descripcionSolicitud', value: stepSelect.descripcionSolicitud ?? '' }],
  }

  if (SIGEDOC) {
    processData.additionalData.push(
      { id: 'SIGEDOCfechaRadicacion', value: stepSelect.SIGEDOCfechaRadicacion },
      { id: 'SIGEDOCid', value: SIGEDOC.id },
      { id: 'SIGEDOCcodigoDeSeguimiento', value: SIGEDOC.codigoSeguimiento },
      { id: 'SIGEDOCautor', value: SIGEDOC.autor },
      { id: 'SIGEDOCtipo', value: SIGEDOC.tipo },
      { id: 'SIGEDOCorigen', value: SIGEDOC.origen },
      { id: 'SIGEDOCasunto', value: SIGEDOC.asunto },
      { id: 'SIGEDOCterceroOrigen', value: SIGEDOC.terceroOrigen },
      { id: 'SIGEDOCusuarioDestino', value: SIGEDOC.usuarioDestino },
      { id: 'SIGEDOCfechaCreacion', value: SIGEDOC.fechaCreacion },
      { id: 'SIGEDOCurlAccesoDirecto', value: SIGEDOC.urlAccesoDirecto }
    )
  }

  return {
    idOfficeOrigin: stepSelect.dependency.id,
    idProcessType: idTypeProcess,
    processData,
  }
}

export const sigedocInfo = (isLoading, dataSigedoc, isError, setValue) => {
  if (!isLoading && dataSigedoc?.success) {
    const [data] = toArray(dataSigedoc?.data) ?? []
    setValue('SIGEDOCfechaRadicacion', formatDate(data?.DocumentoComunicacion?.fechaRadicacion))
    if (!data?.DocumentoComunicacion?.fechaRadicacion) {
      toast.error(MagicString.GENERAL.SEARCH_ERROR)
      return
    }
    toast.success(MagicString.GENERAL.SEARCH_SUCCESS)
  } else if (!isLoading && isError && !dataSigedoc?.success) {
    setValue('SIGEDOCfechaRadicacion', '')
    toast.error(`No se encontraron datos`)
  }
}
