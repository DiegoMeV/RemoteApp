import { useEffect, useState } from 'react'
import { columnsResourceOrigin, useRequestsResourceOrigin } from '../../../funcs'
import GenericAccordion from '../GenericAccordion'
import { BackdropLoading, useGetDomains, useGetResourceOrigin } from '@/lib'
import { useGridApiRef } from '@mui/x-data-grid-premium'

const ResourceOrigin = ({ idContract, openAccordion, handleOpenAccordion }) => {
  const apiRef = useGridApiRef()
  const [adapRow, setAdapRow] = useState({})
  const [rowModesModel, setRowModesModel] = useState({})
  const [rowSelected, setRowSelected] = useState({})
  const [newRow, setNewRow] = useState()

  useEffect(() => {
    setRowModesModel({})
    setNewRow(false)
  }, [openAccordion])

  const {
    data: ResourceOrigin,
    isFetching: loadingInfo,
    isError,
    refetch: refetchResourceOrigin,
  } = useGetResourceOrigin({
    qry: `?contratoId=${idContract}&aumentarInfo=true`,
    enabled: openAccordion && idContract !== 'new',
  })

  const { createResourceOrigin, editResourceOrigin, deleteResourceOrigin, loadingRequest } =
    useRequestsResourceOrigin({
      setRowModesModel,
      rowSelected,
      refetchResourceOrigin,
      setNewRow,
    })

  useEffect(() => {
    if (ResourceOrigin) {
      setAdapRow(
        ResourceOrigin?.data?.map((row) => ({
          ...row,
          origen: { id: row.fte_finan_id, nombre: row.nombre_fte_finan },
        })) ?? []
      )
    }
  }, [ResourceOrigin])

  const { data: origins } = useGetDomains({ qry: '?tipo=RECURSO&activo=S' })

  const onChangePercentage = (id, field, newValue) => {
    if (newValue < 0 || newValue > 100) {
      return
    }
    apiRef.current.setEditCellValue({ id, field, value: newValue })
  }

  const columns = columnsResourceOrigin({
    originsOptions: origins?.data ?? [],
    onChangePercentage,
    ResourceOrigin,
  })

  const updateInfo = (data) => {
    setRowSelected(data)
    const adaptData = {
      id: data?.id,
      contrato_id: idContract,
      fte_finan_id: data?.origen?.id,
      valor: data?.valor,
      descripcion: data?.descripcion,
    }
    if (data?.isNew) {
      createResourceOrigin(adaptData)
      return
    }
    editResourceOrigin(adaptData)
  }

  return (
    <>
      <BackdropLoading loading={loadingRequest} />
      <GenericAccordion
        apiRefDatagrid={apiRef}
        title='Origen de los recursos'
        expandAccordion={openAccordion}
        handleOpenAccordion={handleOpenAccordion}
        labelButton='Agregar origen'
        columns={columns}
        infoRows={adapRow ?? []}
        updateInfo={updateInfo}
        loadingInfo={loadingInfo}
        isError={isError}
        rowModesModel={rowModesModel}
        setRowModesModel={setRowModesModel}
        newRow={newRow}
        setNewRow={setNewRow}
        delItem={(id) => {
          deleteResourceOrigin({ id, es_borrado: true })
        }}
      />
    </>
  )
}

export default ResourceOrigin
