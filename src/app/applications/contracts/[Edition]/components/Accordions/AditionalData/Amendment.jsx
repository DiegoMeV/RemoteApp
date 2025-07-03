import { useEffect, useState } from 'react'
import { columnsByTypeAmendment, columnsTerceros, useRequestsAmendMents } from '../../../funcs'
import GenericAccordion from '../GenericAccordion'
import { GridRowModes, useGridApiRef } from '@mui/x-data-grid-premium'
import {
  ValueListGlobal,
  convertToNumber,
  useBoolean,
  useGetContractors,
  useListAmendMents,
  useSearch,
} from '@/lib'
import { labelAmendment } from '../../../constants'
import toast from 'react-hot-toast'
import { useStoreActions } from 'easy-peasy'
import dayjs from 'dayjs'

const Amendment = ({ idContract, type, openAccordion, handleOpenAccordion, watch }) => {
  const apiRef = useGridApiRef()
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const {
    data: amendments,
    isFetching,
    isError,
    refetch: refetchAmendMents,
  } = useListAmendMents({
    qry: `?idContrato=${idContract}&tipo=${type}&aumentarInfo=true&esBorrado=false`,
    enabled: idContract !== 'new',
  })
  const [rowModesModel, setRowModesModel] = useState({})
  const { label, labelButton } = labelAmendment?.[type] ?? {}
  const [rowSelected, setRowSelected] = useState({})
  const [newRow, setNewRow] = useState()
  const [rowParams, setRowParams] = useState()
  const searchTercero = useSearch()
  const modalTerceros = useBoolean()

  useEffect(() => {
    setRowModesModel({})
    setNewRow(false)
  }, [openAccordion])

  const {
    data: terceros,
    isLoading: loadingTerceros,
    isRefetching: refetchLoading,
  } = useGetContractors({
    qry: searchTercero?.searchText
      ? `?aumentarInfo=true&palabraClave=${searchTercero?.searchText}`
      : '?aumentarInfo=true',
    enabled: openAccordion && idContract !== 'new',
  })

  const selectAutocompleteTercero = (apiRef, props, newValue) => {
    const { id, field, value } = props
    apiRef.current.setEditCellValue({ id, field, value: newValue || value })
    apiRef.current.setEditCellValue({
      id,
      field: 'tipo_identificacion',
      value: newValue?.tercero?.tipo_identificacion ?? '',
    })
    apiRef.current.setEditCellValue({
      id,
      field: 'nro_identificacion',
      value: newValue?.tercero?.nro_identificacion ?? '',
    })
  }

  const columns = columnsByTypeAmendment({
    type,
    terceros: terceros?.data ?? [],
    loadingTerceros,
    searchTercero,
    modalTerceros,
    apiRef,
    setRowParams,
    selectAutocompleteTercero,
    watch,
  })

  const { createAmendMent, editAmendMent, deleteAmendMent } = useRequestsAmendMents({
    setRowModesModel,
    rowSelected,
    refetchAmendMents,
    setNewRow,
    idContract,
  })

  const updateInfo = (data) => {
    const formattedFechaSuscripcion = dayjs(watch('fecha_suscripcion')).startOf('day')
    const formattedFecha = dayjs(data.fecha).startOf('day')
    const formattedFechaHasta = dayjs(data.fecha_hasta).startOf('day')

    if (
      formattedFecha < formattedFechaSuscripcion ||
      formattedFechaHasta < formattedFechaSuscripcion
    ) {
      toast.error('La fecha no debe ser menor a la fecha de suscripción del contrato')
      setRowModesModel((prev) => {
        return {
          ...prev,
          [data.id]: { mode: GridRowModes.Edit },
        }
      })
      apiRef.current.startRowEditMode({ id: data.id })
      return
    }
    let adaptData = {
      tipo: type,
      contrato_id: idContract,
      ...data,
    }

    setRowSelected(data)
    if (type === 'CESION') {
      adaptData = {
        ...adaptData,
        tercero_id: data?.terceroInfo?.id,
      }
      delete adaptData.terceroInfo
      delete adaptData.tipo_identificacion
      delete adaptData.nro_identificacion
    }
    if (adaptData.valor) {
      adaptData.valor = convertToNumber(adaptData.valor)
    }

    if (data?.isNew) {
      delete adaptData.isNew
      createAmendMent(adaptData)
      return
    }
    editAmendMent(adaptData)
  }

  const delItem = (id) => {
    if (type === 'ADICION' || type === 'REDUCCION' || type === 'CESION') {
      setConfirmAlertProps({
        open: true,
        icon: 'warning',
        title: 'Eliminar elemento',
        content: '¿Está seguro que desea eliminar este elemento?',
        onConfirm: () =>
          deleteAmendMent({
            id: id,
            es_borrado: true,
          }),
      })
    }
  }
  const shouldDelete = type === 'ADICION' || type === 'REDUCCION' || type === 'CESION'
  return (
    <>
      <GenericAccordion
        apiRefDatagrid={apiRef}
        expandAccordion={openAccordion}
        handleOpenAccordion={handleOpenAccordion}
        title={`${label}`}
        labelButton={`Agregar ${labelButton}`}
        columns={columns}
        infoRows={amendments?.data ?? []}
        updateInfo={updateInfo}
        loadingInfo={isFetching}
        isError={isError}
        rowModesModel={rowModesModel}
        setRowModesModel={setRowModesModel}
        newRow={newRow}
        setNewRow={setNewRow}
        delItem={delItem}
        shouldDelete={shouldDelete}
      />

      <ValueListGlobal
        title='Terceros'
        rows={terceros?.data ?? []}
        openOptions={modalTerceros}
        columns={columnsTerceros}
        loading={loadingTerceros || refetchLoading}
        searchOptions={searchTercero}
        selectedOption={(params) => selectAutocompleteTercero(apiRef, rowParams, params.row)}
      />
    </>
  )
}

export default Amendment
