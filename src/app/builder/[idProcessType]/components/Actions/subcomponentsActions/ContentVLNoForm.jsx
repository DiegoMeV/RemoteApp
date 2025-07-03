// Re-order this component
import { AutocompleteNoForm, ClassicIconButton, useGetAllActivities } from '@/lib'
import { Box } from '@mui/material'
import { useState } from 'react'
import { ModalSearchDocuments } from '../..'
import { CheckCircle } from '@mui/icons-material'
import { defaultColumns } from '../../../hooks'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

const setColumnsFormGeneralReview = (handleSetActivity, handleOpenClose) => {
  return [
    ...defaultColumns,
    {
      field: 'options',
      headerName: '',
      width: 60,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      headerAlign: 'center',
      renderCell: (params) => (
        <ClassicIconButton
          onClick={() => {
            handleSetActivity(params, handleOpenClose)
          }}
          color='success'
        >
          <CheckCircle />
        </ClassicIconButton>
      ),
    },
  ]
}

const ContentVLNoForm = ({ value, setValue }) => {
  const { data: activities, isLoading: loadingActivities } = useGetAllActivities()
  const [open, setOpen] = useState(false)

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const handleOpenClose = () => {
    setOpen((prevState) => !prevState)
  }

  const onConfirm = (params) => {
    setValue({
      ...value,
      idGoToTask: params.row.id ?? '',
      nameGoToTask: params.row.activity ?? '',
    })
  }

  const onChangeActivity = (option) => {
    if (!option) {
      setValue((prev) => ({ ...prev, idGoToTask: null, nameGoToTask: null }))
      return
    }
    setValue((prev) => ({
      ...prev,
      idGoToTask: option?.id,
      nameGoToTask: option?.name,
    }))
  }

  const handleSetActivity = (params, onClose) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Seleccion actividad',
      content: `Esta seguro de escoger ${params.row.activity} como actividad para ir?`,
      onConfirm: () => {
        onConfirm(params)
        onClose()
        toast.success('Actividad seleccionada')
      },
    })
  }

  const columns = setColumnsFormGeneralReview(handleSetActivity, handleOpenClose)

  return (
    <Box
      marginBottom='10px'
      width='100%'
    >
      <AutocompleteNoForm
        options={activities?.data ?? []}
        isLoading={loadingActivities}
        size='small'
        onChange={onChangeActivity}
        value={{ id: value?.idGoToTask, name: value?.nameGoToTask }}
        label='Ir a la Actividad'
        openModal={handleOpenClose}
      />
      {open && (
        <ModalSearchDocuments
          columns={columns}
          open={open}
          handleClose={handleOpenClose}
          title={'Buscar actividad'}
          actionType={'ASSIGNMENT'}
        />
      )}
    </Box>
  )
}

export default ContentVLNoForm
