import { orderingArray } from '@/lib'
import { columnsComponents, DeleteOption, EditOption } from '../components'
import { editData } from '../funcs'

export const useColumns = ({
  prevData,
  idComponentForm,
  idForm,
  navigation,
  idApplication,
  restParams,
  editAllowed,
  deleteAllowed,
  confirmDelete,
}) => {
  const columns = prevData
    ?.filter((column) => !column.hidden)
    .map((column) => {
      return {
        field: column?.column.toLowerCase(),
        pk: column?.pk,
        headerName: column?.title,
        minWidth: 150,
        order: column?.order,
        ...(column?.type && {
          render: (item) => {
            const Component = columnsComponents[column?.type]
            return <Component item={item} />
          },
        }),
      }
    })

  const orderColumns = orderingArray(columns, 'order')

  const options = {
    field: 'options',
    headerName: '',
    width: 50,
    pinned: 'right',
    renderCell: (data) => (
      <div className='flex flex-row'>
        {editAllowed ? (
          <EditOption
            onClick={() => {
              editData({
                prevData,
                data,
                idComponentForm,
                idForm,
                navigation,
                idApplication,
                restParams,
              })
            }}
          />
        ) : null}
        {deleteAllowed ? (
          <DeleteOption
            onClick={() => {
              confirmDelete({ data })
            }}
          />
        ) : null}
      </div>
    ),
  }
  return prevData ? [...orderColumns, options] : []
}

export default useColumns
