import { useApisContractAffected } from '@/app/applications/alerts/[edition]/components/contractAffected/funcs'
import {
  useCreateAmendMent,
  useCreateContract,
  useCreateRegionByContract,
  useCreateResourceOrigin,
  useEditAmendMent,
  useEditContract,
  useEditRegionByContract,
  useEditResourceOrigin,
} from '@/lib'
import { GridRowModes } from '@mui/x-data-grid-premium'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useRequestsContracts = ({ idContract, refetchContractInfo }) => {
  const navigate = useNavigate()
  const backPathUrl = useStoreState((state) => state.backPathUrl.backPathUrl)
  const { addContractAffected, loadingUpdates } = useApisContractAffected(
    null,
    null,
    false,
    null,
    null,
    null
  )
  const { mutateAsync: createContract, isPending: loadingCreate } = useCreateContract({
    onSuccess: (response) => {
      toast.success('Contrato creado exitosamente')
      if (backPathUrl) {
        const match = backPathUrl.match(/alerts\/([a-zA-Z0-9-]+)/)
        const id = match ? match[1] : null
        addContractAffected({
          contrato_id: response?.data?.id,
          valor_contrato: response?.data?.valor_final_contratado,
          alerta_id: id,
        })
        navigate(`/applications/alerts/${id}`)
      } else {
        navigate(`/applications/contracts/${response?.data?.id}`)
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al crear contrato')
    },
  })
  const { mutateAsync: editContract, isPending: loadingEdit } = useEditContract({
    idContract,
    onSuccess: () => {
      toast.success('Contrato editado exitosamente')
      refetchContractInfo()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al editar contrato')
    },
  })
  return { createContract, editContract, loading: loadingCreate || loadingEdit || loadingUpdates }
}

export const useRequestsResourceOrigin = ({
  setRowModesModel,
  rowSelected,
  refetchResourceOrigin,
  setNewRow,
}) => {
  const errorRowModel = () => {
    setRowModesModel((prev) => {
      return {
        ...prev,
        [rowSelected.id]: { mode: GridRowModes.Edit, ignoreModifications: true },
      }
    })
  }
  const { mutateAsync: createResourceOrigin, isPending: loadingCreate } = useCreateResourceOrigin({
    onSuccess: () => {
      toast.success('Origen de recurso creado exitosamente')
      refetchResourceOrigin()
      setNewRow(false)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al crear origen de recurso')
      errorRowModel()
    },
  })
  const { mutateAsync: editResourceOrigin, isPending: loadingEdit } = useEditResourceOrigin({
    onSuccess: () => {
      toast.success('Origen de recurso editado exitosamente')
      refetchResourceOrigin()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al editar origen de recurso')
      errorRowModel()
    },
  })

  const { mutateAsync: deleteResourceOrigin, isPending: deleteResource } = useEditResourceOrigin({
    onSuccess: () => {
      toast.success('Origen de recurso borrado exitosamente')
      refetchResourceOrigin()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al eliminar el origen de recurso')
    },
  })
  return {
    createResourceOrigin,
    editResourceOrigin,
    deleteResourceOrigin,
    loadingRequest: loadingCreate || loadingEdit || deleteResource,
  }
}

export const useRequestsRegions = ({ setRowModesModel, rowSelected, refetchRegion, setNewRow }) => {
  const errorRowModel = () => {
    setRowModesModel((prev) => {
      return {
        ...prev,
        [rowSelected.id]: { mode: GridRowModes.Edit, ignoreModifications: true },
      }
    })
  }
  const { mutateAsync: createRegionByContract, isPending: loadingCreate } =
    useCreateRegionByContract({
      onSuccess: () => {
        toast.success('Regionalización creada exitosamente')
        refetchRegion()
        setNewRow(false)
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? 'Error al crear origen de recurso')
        errorRowModel()
      },
    })
  const { mutateAsync: editRegionByContract, isPending: loadingEdit } = useEditRegionByContract({
    onSuccess: () => {
      toast.success('Regionalización editada exitosamente')
      refetchRegion()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al editar origen de recurso')
      errorRowModel()
    },
  })
  return {
    createRegionByContract,
    editRegionByContract,
    loadingRequest: loadingCreate || loadingEdit,
  }
}

export const useRequestsAmendMents = ({
  setRowModesModel,
  rowSelected,
  refetchAmendMents,
  setNewRow,
  idContract,
}) => {
  const queryClient = useQueryClient()

  const errorRowModel = () => {
    setRowModesModel((prev) => {
      return {
        ...prev,
        [rowSelected.id]: { mode: GridRowModes.Edit, ignoreModifications: true },
      }
    })
  }
  const { mutateAsync: createAmendMent, isPending: loadingCreate } = useCreateAmendMent({
    onSuccess: () => {
      toast.success('Novedad creada exitosamente')
      refetchAmendMents()
      setNewRow(false)
      queryClient.invalidateQueries([`/contratos/${idContract}`])
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al crear novedad')
      errorRowModel()
    },
  })
  const { mutateAsync: editAmendMent, isPending: loadingEdit } = useEditAmendMent({
    onSuccess: () => {
      toast.success('Novedad editada exitosamente')
      queryClient.invalidateQueries([`/contratos/${idContract}`])
      refetchAmendMents()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al crear novedad')
      errorRowModel()
    },
  })
  const { mutateAsync: deleteAmendMent, isPending: loadingDelete } = useEditAmendMent({
    onSuccess: () => {
      toast.success('Novedad eliminada exitosamente')
      queryClient.invalidateQueries([`/contratos/${idContract}`])
      refetchAmendMents()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al crear novedad')
    },
  })
  return {
    createAmendMent,
    editAmendMent,
    deleteAmendMent,
    loadingRequest: loadingCreate || loadingEdit || loadingDelete,
  }
}
