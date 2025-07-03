import { DynamicTableAlert } from '@/app/applications/components'
import { CustomSearchDatagrid, useGetVariableModel } from '@/lib'
import { columnsVariableTable } from './funcs'

const VariablesTableBlock = ({ idBlock, idEdition }) => {
  const { data: variablesByBlock, isLoading: loadingRows } = useGetVariableModel({
    idBlock,
    idModel: idEdition,
  })
  const columns = columnsVariableTable(idBlock, idEdition)

  const rows = variablesByBlock?.data
  return (
    <DynamicTableAlert
      columns={columns ?? []}
      rows={rows ?? []}
      loading={loadingRows}
      toolbar={CustomSearchDatagrid}
      rowId={(row) => row.variable_id}
    />
  )
}

export default VariablesTableBlock
