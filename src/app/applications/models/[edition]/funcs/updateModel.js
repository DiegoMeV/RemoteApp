import { useCreateCatModel, useCreateModel, useEditCatModel, useEditModel } from '@/lib'
import { GridRowModes } from '@mui/x-data-grid-premium'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useUpdateRequest = ({ idModel }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const { mutateAsync: createModel, isPending: loadingCreate } = useCreateModel({
    onSuccess: (response) => {
      queryClient.invalidateQueries([`/${companyData?.companyId}/models`])
      toast.success('Modelo creada con éxito')
      navigate(`/applications/models/${response?.data?.id}`)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const { mutateAsync: editModel, isPending: loadingEdit } = useEditModel({
    idModel: idModel,
    onSuccess: () => {
      queryClient.invalidateQueries([`/${companyData?.companyId}/models`])
      toast.success('Modelo editada con éxito')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  return { createModel, editModel, loadingUpdate: loadingCreate || loadingEdit }
}

export const useRequestsCatModel = (refetchCat, setRowModesModel, setNewRow, editedCat, newRow) => {
  const { mutateAsync: createCatModel, isPending: loadingCreate } = useCreateCatModel({
    onSuccess: () => {
      toast.success('Categoria creada con éxito')
      refetchCat()
      setNewRow(false)
      if (newRow) {
        setRowModesModel({})
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
      setRowModesModel((prev) => {
        return { ...prev, [editedCat.id]: { mode: GridRowModes.Edit } }
      })
    },
  })
  const { mutateAsync: editCatModel, isPending: loadingEdit } = useEditCatModel({
    onSuccess: () => {
      toast.success('Categoria editada con éxito')
      refetchCat()
      setRowModesModel((prev) => {
        return { ...prev, [editedCat.id]: { mode: GridRowModes.View, ignoreModifications: true } }
      })
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
      setRowModesModel((prev) => {
        return { ...prev, [editedCat.id]: { mode: GridRowModes.Edit } }
      })
    },
  })
  return { createCatModel, editCatModel, loadingUpdate: loadingCreate || loadingEdit }
}

export const conditionalRequest = (data, editModel, createModel, idModelo) => {
  const active = data.activo ? 'S' : 'N'

  if (idModelo === 'new') {
    createModel({ ...data, activo: active })
  } else {
    editModel({ ...data, activo: active })
  }
}
