import { BackdropLoading, CustomModal, GenericTable, ValueListGlobal } from '@/lib'
import { Box, Button } from '@mui/material'
import { useStoreActions } from 'easy-peasy'
import { useEffect, useState } from 'react'
import { addOptionsColumns } from '../funcs'
import { GenericForm } from '@/libV4'

const TableAddRows = ({
  columns,
  inputsList,
  loadingInputs,
  formModal,
  infoModal,
  onSubmit,
  handlerModal,
  defaultRows,
  loadingHandlers,
  handleDelete,
  nameOption,
  loadingActor,
}) => {
  const [rows, setRows] = useState([])
  useEffect(() => {
    setRows(defaultRows)
  }, [defaultRows])

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const handleAddRow = () => {
    handlerModal?.handleShow()
  }
  const columnsOptions = addOptionsColumns({ columns, handleAddRow, formModal, handleDelete })

  const handleClose = () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Cerrar',
      content: '¿Está seguro que desea cerrar el formulario? Se perderán los datos.',
      onConfirm: () => {
        formModal?.reset()
        handlerModal?.handleShow()
      },
    })
  }
  const actions = [
    {
      label: 'Cancelar',
      color: 'error',
      variant: 'contained',
      disabled: loadingActor,
      onClick: () => {
        handleClose()
      },
    },
    {
      label: loadingActor ? 'Cargando... ' : 'Guardar',
      variant: 'contained',
      disabled: loadingActor,
      onClick: () => {
        onSubmit()
      },
    },
  ]
  return (
    <Box
      bgcolor={'backgroundWhite1'}
      display='flex'
      flexDirection='column'
      gap={2}
      p={2}
    >
      {loadingHandlers && <BackdropLoading loading={loadingHandlers} />}
      <Button
        variant='contained'
        color='primary'
        onClick={handleAddRow}
        disabled={loadingInputs}
        sx={{ alignSelf: 'flex-end' }}
      >
        Agregar {nameOption ?? ''}
      </Button>
      <Box sx={{ height: '45vh', width: '100%' }}>
        <GenericTable
          rows={rows ?? []}
          columns={columnsOptions ?? []}
          loading={loadingInputs}
          columnBuffer={20}
        />
      </Box>
      {handlerModal.show && (
        <CustomModal
          open={handlerModal.show}
          maxHeight='80vh'
          title={
            !formModal.getValues('isEdit')
              ? `Creación ${nameOption ?? ''}`
              : `Edición ${nameOption ?? ''}`
          }
          handleClose={() => {
            handleClose()
          }}
          modalType='form'
          size='lg'
          actions={actions}
        >
          <div className='grid grid-cols-12 gap-4 w-full'>
            <GenericForm
              inputs={inputsList}
              control={formModal?.control}
            />
          </div>
          <ValueListGlobal
            {...infoModal}
            selectedOption={(params) => {
              formModal?.setValue(infoModal.name, params.row)
            }}
            searchOptions={infoModal?.searchOptions}
          />
        </CustomModal>
      )}
    </Box>
  )
}

export default TableAddRows
