import GenericAccordion from '@/app/applications/contracts/[Edition]/components/Accordions/GenericAccordion'
import { Grid } from '@mui/material'
import { GridRowModes } from '@mui/x-data-grid-premium'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const TableForm = ({ form, columnsTable, apiRef, requiredOption, labelButton }) => {
  const [rowModesModel, setRowModesModel] = useState({})
  const [newRow, setNewRow] = useState()
  const [rows, setRows] = useState([])
  useEffect(() => {
    form.setValue('rows', rows)
  }, [form, rows])

  const updateInfo = (data) => {
    // control when the name is undefined
    if (data[requiredOption] === undefined) {
      toast.error('Debe seleccionar mínimo un elemento.')
      setRowModesModel({ ...rowModesModel, [data.id]: { mode: GridRowModes.Edit } })
      apiRef.current.startRowEditMode({ id: data.id })
      return
    }
    // Create new row
    if (data?.isNew) {
      setRows([...rows, data])
      setNewRow(false)
      return
    }
  }
  useEffect(() => {
    if (rows.length !== 0) {
      setNewRow(true)
    }
    if (rows.length === 0) {
      setNewRow(false)
    }
  }, [rows])
  const deleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id))
  }
  return (
    <Grid
      item
      xs={12}
    >
      <GenericAccordion
        apiRefDatagrid={apiRef}
        labelButton={labelButton}
        disabledButtons={!form.watch('office')}
        columns={columnsTable}
        infoRows={rows}
        updateInfo={updateInfo}
        rowModesModel={rowModesModel}
        setRowModesModel={setRowModesModel}
        newRow={newRow}
        setNewRow={setNewRow}
        delItem={deleteRow}
        editable={false}
        noAccordion={true}
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
