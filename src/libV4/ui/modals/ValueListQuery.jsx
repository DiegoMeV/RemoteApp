import { IconButton } from '@mui/material'
import { CustomModal } from '.'
import { CheckCircle } from '@mui/icons-material'
import { BackdropLoading } from '@/libV4/components'
import { QueryTable } from '../tables'

const ValueListQuery = ({
  show,
  handleShow,
  handleShowConfirm,
  selectedOption,
  queryProps,
  tableProps,
  closeOnSelect = true,
  loadingSubmit,
  title = '',
}) => {
  const selectColumn = {
    field: 'options',
    headerName: '',
    pinned: 'right',
    width: 60,
    renderCell: (row) => (
      <IconButton
        color='success'
        onClick={async () => {
          await selectedOption(row)
          if (closeOnSelect) {
            handleShow()
          }
        }}
      >
        <CheckCircle />
      </IconButton>
    ),
  }

  return (
    <CustomModal
      title={`Lista de valores${title && title?.trim().length > 0 ? ` - ${title}` : ''}`}
      open={show}
      handleClose={() => {
        handleShowConfirm()
      }}
      size='lg'
      dialogClassName='relative'
    >
      <BackdropLoading
        loading={loadingSubmit}
        sizeLoading={80}
        sx={{
          position: 'absolute',
          borderRadius: '5px',
          zIndex: 100,
        }}
      />
      <QueryTable
        queryProps={queryProps}
        tableProps={{
          ...tableProps,
          columns: Array.isArray(tableProps.columns) ? [...tableProps.columns, selectColumn] : [],
        }}
      />
    </CustomModal>
  )
}

export default ValueListQuery
