import { ClassicIconButton } from '@/lib'
import { Delete, Edit, Visibility } from '@mui/icons-material'

const useColumns = ({
  data,
  onClick,
  onClickView,
  onClickDelete,
  editOption,
  deleteOption,
  viewOption,
}) => {
  const columns =
    data?.items
      ?.filter((column) => !column.hidden)
      .map((item) => ({
        headerName: item?.label,
        field: item?.id,
        width: 300,
      })) || []

  const options = {
    field: 'options',
    headerName: '',
    width: 20,
    pinned: 'right',
    renderCell: (data) => {
      return (
        <>
          <div className='flex justify-center'>
            {editOption && (
              <ClassicIconButton onClick={() => onClick(true, data)}>
                <Edit />
              </ClassicIconButton>
            )}
            {deleteOption && (
              <ClassicIconButton
                onClick={() => {
                  onClickDelete({ data })
                }}
              >
                <Delete />
              </ClassicIconButton>
            )}
            {viewOption && (
              <ClassicIconButton
                onClick={() => {
                  onClickView(data)
                }}
              >
                <Visibility />
              </ClassicIconButton>
            )}
          </div>
        </>
      )
    },
  }
  return data ? [...columns, options] : []
}

export default useColumns
