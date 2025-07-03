import GenericAccordion from '../GenericAccordion'
import {
  columnsMembers,
  selectAutocompleteMember,
  tercerosColumns,
  useRequestsMembers,
} from '../../../funcs'
import {
  BackdropLoading,
  ValueListGlobal,
  useBoolean,
  useGetContractors,
  useGetMembers,
  useSearch,
} from '@/lib'
import { useEffect, useState } from 'react'
import { useGridApiRef } from '@mui/x-data-grid-premium'
import { buildQryContractors } from '@/app/applications/contracts/funcs'
import { useStoreActions } from 'easy-peasy'

const Members = ({ idContract, openAccordion, handleOpenAccordion }) => {
  const apiRef = useGridApiRef()
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const [rowModesModel, setRowModesModel] = useState({})
  const [rowSelected, setRowSelected] = useState({})
  const [newRow, setNewRow] = useState()
  const [rowParams, setRowParams] = useState()
  const modalTerceros = useBoolean()
  const searchTerceros = useSearch()

  useEffect(() => {
    setRowModesModel({})
    setNewRow(false)
  }, [openAccordion])

  const {
    data: members,
    isFetching,
    isError,
    refetch: refetchMembers,
  } = useGetMembers({
    qry: `?contratoId=${idContract}&aumentarInfo=true`,
    enabled: openAccordion && idContract !== 'new',
  })

  const qry = buildQryContractors(searchTerceros.searchText)

  const {
    data: terceros,
    isLoading: loadingTerceros,
    isError: errorTerceros,
  } = useGetContractors({
    qry: qry,
    enabled: openAccordion && idContract !== 'new',
  })

  const { createMember, editMember, loadingRequest } = useRequestsMembers({
    setRowModesModel,
    rowSelected,
    refetchMembers,
    setNewRow,
  })

  const updateInfo = (data) => {
    setRowSelected(data)
    const adaptData = {
      id: data?.id,
      contrato_id: idContract,
      tercero_id: data?.tercero?.id,
    }
    if (data?.isNew) {
      createMember(adaptData)
      return
    }
    editMember(adaptData)
  }
  const columns = columnsMembers({
    terceros: terceros?.data ?? [],
    loadingTerceros,
    errorTerceros,
    apiRef,
    modalTerceros,
    setRowParams,
    searchTercero: searchTerceros?.handleSearchText,
  })

  const delItem = (id) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Eliminar elemento',
      content: '¿Está seguro que desea eliminar este integrante?',
      onConfirm: () => editMember({ id, es_borrado: true }),
    })
  }
  return (
    <>
      <BackdropLoading loading={loadingRequest} />
      <GenericAccordion
        apiRefDatagrid={apiRef}
        expandAccordion={openAccordion}
        handleOpenAccordion={handleOpenAccordion}
        title='Integrantes'
        labelButton='Agregar integrante'
        columns={columns}
        infoRows={members?.data ?? []}
        updateInfo={updateInfo}
        loadingInfo={isFetching}
        isError={isError}
        rowModesModel={rowModesModel}
        setRowModesModel={setRowModesModel}
        newRow={newRow}
        setNewRow={setNewRow}
        delItem={delItem}
      />
      <ValueListGlobal
        title='Terceros'
        openOptions={modalTerceros}
        selectedOption={(params) => selectAutocompleteMember(apiRef, rowParams, params?.row)}
        searchOptions={searchTerceros}
        rows={terceros?.data ?? []}
        loading={loadingTerceros}
        columns={tercerosColumns}
      />
    </>
  )
}

export default Members
