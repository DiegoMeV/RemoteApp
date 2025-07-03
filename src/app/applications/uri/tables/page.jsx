import { useGridApiRef } from '@mui/x-data-grid-premium'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { comminmentsColumns, tableColumns } from './funcs'
import { useNavigate } from 'react-router-dom'
import {
  NoAccessCard,
  // TODO: NoAccessCard,
  useBoolean,
  useMutationDynamicBaseUrl,
  usePrivileges,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { ViewTables } from './views'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { createPaginationQry } from '../../funcs'
import { useModelPagination } from '../../hooks'
import { AccessControl } from '@/libV4'
// TODO: import AccessControl from '@/app/AccessControl'

const Tables = () => {
  const searchTables = useSearch()
  const { model, handlePaginationModelChange } = useModelPagination()
  const qry = createPaginationQry({ search: searchTables, model })
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)
  const {
    data: dataTables,
    isError,
    refetch: refetchTables,
    isFetching: fetchingTables,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    url: `/mesasAri/byUser${qry}&inclRegistro=true`,
  })

  const apiRef = useGridApiRef()
  const navigate = useNavigate()
  const dark = useStoreState((state) => state.darkTheme.dark)
  const modalComminments = useBoolean()
  const informativeModal = useBoolean()
  const [rowParams, setRowParams] = useState({})
  const [idCompromiso, setIdCompromiso] = useState('')
  const [idRow, setIdRow] = useState()

  const userData = useStoreState((state) => state.user.userData)
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const { mutateAsync: actasGeneration, isPending: pendingGeneration } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlDocuments',
    url: '/apps-specific/cgr/acta-mesa',
    onSuccess: (response) => {
      toast.success('Acta generada con éxito')
      setPreviewer({
        open: true,
        idDocument: response?.data?.id,
        loadingPreviewer: true,
      })
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al generar acta')
    },
  })
  const {
    data: comminments,
    isLoading: loadingComminments,
    isError: errorComminments,
    isFetching: fetchingComminments,
    refetch: refetchComminments,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    enabled: !!rowParams?.isComminmentsModal,
    url: `/compromisosAri?mesaId=${rowParams?.id}&aumentarInfo=true`,
  })

  const tableRequest = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    url: `/mesasAri/${idRow}?inclRegistro=true`,
    enabled: !!idRow,
  })

  const form = useForm()

  const handleOpenModal = (params) => {
    setRowParams({ ...params, isComminmentsModal: true })
    modalComminments.handleShow()
  }

  const handleGenerateActa = (id) => {
    actasGeneration({ body: { idMesa: id } })
  }
  const hasEditPrivilege = usePrivileges('cgr.uri.editar_mesas')
  const hasCompromisedRevisionPriv = usePrivileges('cgr.uri.mesas_revision_compromisos')
  const hasRevisionPriv = usePrivileges('cgr.uri.mesas_revision')
  const hasGeneratePriv = usePrivileges('cgr.uri.mesas_generacion_acta')

  const columns = tableColumns(
    navigate,
    handleOpenModal,
    hasEditPrivilege,
    hasCompromisedRevisionPriv,
    hasRevisionPriv,
    hasGeneratePriv,
    informativeModal,
    setIdRow,
    handleGenerateActa
  )

  const handleCreate = () => {
    navigate(`/applications/uri/tables/mesasUri`)
  }

  const { mutateAsync: reviewComminments, isPending: updatingComminments } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlCgr',
      url: `/revisionesCompromiso/${idCompromiso}`,
      isCompanyRequest: true,
      onSuccess: () => {
        toast.success('Compromiso creado con éxito')
        refetchComminments()
        setIdCompromiso('')
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? 'Error al editar compromiso')
      },
    })

  const onSave = (row) => {
    const rowValues = form.getValues(row.id)
    setIdCompromiso(row.id)
    const allFieldHaveValue = Object.keys(rowValues).every((label) => {
      return rowValues?.[label] ? true : false
    })
    if (!allFieldHaveValue) {
      toast.error('Todos los campos son requeridos')
    } else {
      setConfirmAlertProps({
        open: true,
        icon: 'warning',
        content: `¿Está seguro que desea guardar la revisión?`,
        onConfirm: () => {
          reviewComminments({
            body: {
              revision: rowValues.revision,
              comentario: rowValues.comentario,
            },
          })
          return
        },
      })
    }
  }

  const columnsToComminments = comminmentsColumns(form, onSave, userData)

  const comminmentsData = {
    rows: comminments?.data ?? [],
    columnsToComminments,
    loadingComminments: loadingComminments || fetchingComminments,
    errorComminments,
    updatingComminments: updatingComminments,
  }

  const tableProps = {
    dataTables,
    columns,
    isLoading: fetchingTables,
    isError,
    apiRef,
    dark,
    navigate,
    handleCreate,
    modalComminments,
    comminmentsData,
    tableRequest,
    informativeModal,
    refetchTables,
    searchTables,
    pendingGeneration,
    model,
    handlePaginationModelChange,
  }

  return (
    <AccessControl
      privilege='cgr.uri.visualizar_mesas'
      nodeContent={<NoAccessCard />}
    >
      <ViewTables {...tableProps} />
    </AccessControl>
  )
}

export default Tables
