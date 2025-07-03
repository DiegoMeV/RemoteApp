import { useCreateBlock, useCreateVarBlock, useEditBlock, useEditVarBlock } from '@/lib'
import { GridRowModes } from '@mui/x-data-grid-premium'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useRequestsBlock = ({ idBlock }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const companyId = companyData?.companyId
  const { mutateAsync: createBlock, isPending: loadingCreate } = useCreateBlock({
    onSuccess: () => {
      queryClient.invalidateQueries([`/${companyId}/bloquesDatos`])
      toast.success('Bloque creado con éxito')
      navigate(`/applications/blocks`)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al crear el bloque')
    },
  })
  const { mutateAsync: editBlock, isPending: loadingEdit } = useEditBlock({
    idBlock,
    onSuccess: () => {
      queryClient.invalidateQueries([`/${companyId}/bloquesDatos`])
      toast.success('Bloque editado con éxito')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al editar el bloque')
    },
  })
  return { createBlock, editBlock, loadingUpdate: loadingCreate || loadingEdit }
}

export const useRequestsVarBlock = (refetchVar, setRowModesModel, setNewRow, editedVar) => {
  const { mutateAsync: createVarBlock, isPending: loadingCreate } = useCreateVarBlock({
    onSuccess: () => {
      toast.success('Variable creada con éxito')
      refetchVar()
      setNewRow(false)
      setRowModesModel({})
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
      setRowModesModel((prev) => {
        return { ...prev, [editedVar.id]: { mode: GridRowModes.Edit } }
      })
    },
  })
  const { mutateAsync: editVarBlock, isPending: loadingEdit } = useEditVarBlock({
    onSuccess: () => {
      toast.success('Variable editada con éxito')
      refetchVar()
      setRowModesModel((prev) => {
        return { ...prev, [editedVar.id]: { mode: GridRowModes.View, ignoreModifications: true } }
      })
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
      setRowModesModel((prev) => {
        return { ...prev, [editedVar.id]: { mode: GridRowModes.Edit } }
      })
    },
  })
  return { createVarBlock, editVarBlock, loadingUpdate: loadingCreate || loadingEdit }
}

export const conditionalRequest = (data, editBlock, createBlock, idBlock) => {
  if (idBlock === 'new') {
    createBlock(data)
    return
  }
  editBlock(data)
}
