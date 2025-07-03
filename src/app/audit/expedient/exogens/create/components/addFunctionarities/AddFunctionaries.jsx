import GenericAccordion from '@/app/applications/contracts/[Edition]/components/Accordions/GenericAccordion'
import { Grid } from '@mui/material'
import { useGridApiRef } from '@mui/x-data-grid-premium'
import { useEffect, useState } from 'react'
import { useColumnsTable } from './useColumnsTable'
import { useStoreActions } from 'easy-peasy'
import { updateInfoFunctionaries, useApis } from './funcs'

const TableForm = ({ idInspectionPlan, form }) => {
  const apiRef = useGridApiRef()
  const columnsTable = useColumnsTable({ apiRef })
  const [rowModesModel, setRowModesModel] = useState({})
  const [newRow, setNewRow] = useState()
  const [rows, setRows] = useState([])
  const [idProcessRow, setIdProcessRow] = useState()
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  useEffect(() => {
    form.setValue('rows', rows)
  }, [form, rows])

  const {
    getInspectionOfficials,
    createInspectionOfficials,
    deleteInspectionOfficials,
    isLoadingInfoOfficials,
    isLoadingCreateOfficials,
    isLoadingDeleteOfficials,
  } = useApis({
    idInspectionPlan,
    setRows,
    setNewRow,
    setRowModesModel,
    idProcessRow,
    rowModesModel,
    apiRef,
  })

  useEffect(() => {
    if (idInspectionPlan) {
      getInspectionOfficials()
    }
  }, [getInspectionOfficials])

  const updateInfo = updateInfoFunctionaries({
    setRowModesModel,
    rowModesModel,
    apiRef,
    createInspectionOfficials,
  })

  const deleteRow = (id) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Eliminar',
      content: '¿Desea eliminar este funcionario ?',
      onConfirm: () => {
        deleteInspectionOfficials({ qry: `/${id}` })
      },
    })
  }
  return (
    <Grid
      item
      xs={12}
      className='overflow-auto'
    >
      <GenericAccordion
        apiRefDatagrid={apiRef}
        labelButton={'Asignar funcionario '}
        columns={columnsTable}
        infoRows={rows}
        updateInfo={updateInfo}
        setIdProcessRow={setIdProcessRow}
        rowModesModel={rowModesModel}
        setRowModesModel={setRowModesModel}
        newRow={newRow}
        setNewRow={setNewRow}
        delItem={deleteRow}
        editable={false}
        noAccordion={true}
        loadingInfo={isLoadingCreateOfficials || isLoadingInfoOfficials || isLoadingDeleteOfficials}
        noSearch={true}
        sx={{
          '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer': {
            display: 'none',
          },
        }}
      />
    </Grid>
  )
}

export default TableForm
