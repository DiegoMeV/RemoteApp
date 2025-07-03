import { CheckCircleOutline } from '@mui/icons-material'
import CustomModal from './CustomModal'
import { DataGridCustom } from '../tables'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { IconButton } from '@mui/material'

const ValueList = () => {
  const VLProps = useStoreState((state) => state.newValueList.VLProps)
  const handleShow = useStoreActions((actions) => actions.newValueList.handleClose)
  const valueList = VLProps
  const toggleDisabled = valueList?.toggleDisabled
  const columns = valueList?.columns ?? []
  const open = valueList?.open
  const title = valueList?.title
  const shouldClose = valueList?.shouldClose
  const dgProps = valueList?.dgProps
  const requestParams = valueList?.requestParams
  const paginationCursor = valueList?.paginationCursor
  const queryRequest = valueList?.queryRequest
  const toolbarProps = valueList?.toolbarProps

  const columnSelect = {
    dataIndex: 'options',
    title: '',
    width: 60,
    pinned: 'right',
    render: (_, params) => {
      return (
        <IconButton
          disabled={toggleDisabled?.(params?.id, params)}
          color='success'
          onClick={() => {
            valueList?.selectedOption?.(params)
            if (shouldClose) {
              handleShow?.()
            }
          }}
        >
          <CheckCircleOutline />
        </IconButton>
      )
    },
  }

  const allColumns = valueList?.selectedOption ? [...columns, columnSelect] : columns

  const adaptedColumns = allColumns?.map((column) => {
    if (column?.render || column?.renderCell) {
      return {
        field: column.dataIndex ?? column.field,
        headerName: column.title ?? column.headerName,
        width: column.width ?? column.width,
        pinned: column.fixed ?? column.pinned,
        renderCell: column?.render
          ? (row, value) => column?.render(value, row)
          : column?.renderCell,
      }
    }
    return {
      field: column.dataIndex ?? column.field,
      headerName: column.title ?? column.headerName,
      width: column.width ?? column.width,
      pinned: column.fixed ?? column.pinned,
    }
  })

  return (
    <CustomModal
      open={open ?? false}
      handleClose={() => {
        handleShow?.()
      }}
      height='calc(100vh - 150px)'
      title={`Lista de valores ${title ? `- ${title}` : ''}`}
      size='lg'
    >
      {requestParams && (
        <DataGridCustom
          toolbarProps={toolbarProps}
          requestProps={{
            ...requestParams,
            querySearch: queryRequest?.querySearch,
            paginationCursor,
            additionalQry: queryRequest?.additionalQuery,
          }}
          tableProps={{
            containerProps: {
              className: 'h-[calc(100vh-350px)]',
            },
            rowHeight: valueList?.selectedOption ? null : 52,
            columns: adaptedColumns,
            ...dgProps,
          }}
        />
      )}
    </CustomModal>
  )
}

export default ValueList
