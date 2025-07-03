import { ClassicIconButton, CommonTextField, MagicString } from '@/lib'
import { CheckCircle, PlagiarismOutlined } from '@mui/icons-material'
import { Grid } from '@mui/material'
import { useStoreActions } from 'easy-peasy'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { ModalSearchDocuments } from '..'

const SearchActivity = ({ formValues, setFormValues }) => {
  const [open, setOpen] = useState(false)

  const handleOpenClose = () => {
    setOpen(!open)
  }

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const handleSetActivity = (params) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Seleccion actividad',
      content: `Esta seguro de escoger ${params.row.activity} como actividad?`,
      onConfirm: () => {
        setFormValues({
          ...formValues,
          nameNextTask: params.row.activity ?? '',
          idNextTask: params.row.id ?? '',
        })
        handleOpenClose()
        toast.success('Actividad seleccionada')
      },
    })
  }

  const columns = [
    {
      field: 'stage',
      headerName: 'Etapa',
      width: 250,
    },
    {
      field: 'activity',
      headerName: 'Actividad',
      width: 250,
    },
    {
      field: 'description',
      headerName: 'Descripción',
      width: 250,
    },
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
            handleSetActivity(params)
          }}
          color='success'
        >
          <CheckCircle />
        </ClassicIconButton>
      ),
    },
  ]

  return (
    <Grid
      item
      xs={12}
      display={'flex'}
      gap={1}
    >
      <CommonTextField
        label={MagicString.CONSTRUCTOR.ACTIVITY_TO_REDIRECT}
        value={formValues.nameNextTask}
        name={'documentName'}
        size='small'
        required={false}
        disabled={true}
      />
      <ClassicIconButton
        color='secondary'
        placement='bottom'
        onClick={handleOpenClose}
      >
        <PlagiarismOutlined />
      </ClassicIconButton>
      {open && (
        <ModalSearchDocuments
          columns={columns}
          open={open}
          handleClose={handleOpenClose}
          title={'Buscar actividad'}
          documentName={formValues.nameNextTask}
          actionType={'ASSIGNMENT'}
        />
      )}
    </Grid>
  )
}

export default SearchActivity
