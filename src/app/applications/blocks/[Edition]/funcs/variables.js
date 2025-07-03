import { CustomTextFieldEditingDG } from '@/app/applications/components'
import OptionsRelationsTable from '@/app/applications/components/OptionsRelationsTable'
import { AutocompleteNoForm } from '@/lib'

export const useColumnsVariables = (
  rowModesModel,
  setRowModesModel,
  setNewRow,
  setRows,
  newRow,
  variableOptions
) => {
  const {
    modalVariables,
    variables,
    loadingVariables,
    searchVariable,
    setRowParams,
    selectAutocompleteValue,
  } = variableOptions

  return [
    {
      field: 'orden',
      headerName: 'Orden',
      type: 'number',
      editable: true,
      width: 120,
      headerAlign: 'left',
      cellAlign: 'left',
      renderEditCell: (params) => (
        <CustomTextFieldEditingDG
          {...params}
          type='number'
        />
      ),
    },
    {
      field: 'variable',
      headerName: 'Variable',
      editable: true,
      width: 300,
      valueGetter: (params) => `${params.row?.variable?.name ?? ''}`,
      renderEditCell: (params) => (
        <AutocompleteNoForm
          value={params.value}
          options={variables?.data}
          handleSearch={searchVariable?.handleSearchText}
          isLoading={loadingVariables}
          size='medium'
          placeholder='Buscar variable'
          openModal={() => {
            modalVariables.handleShow()
            setRowParams(params)
          }}
          onChange={(newValue) => selectAutocompleteValue(params, newValue)}
        />
      ),
    },

    {
      field: 'descripcion',
      headerName: 'Observación',
      editable: true,
      width: 400,
      valueGetter: (params) => `${params.row?.descripcion ?? ''}`,
      renderEditCell: (params) => <CustomTextFieldEditingDG {...params} />,
    },
    {
      field: 'options',
      headerName: '',
      width: 100,
      renderCell: ({ id }) => {
        return (
          <OptionsRelationsTable
            id={id}
            rowModesModel={rowModesModel}
            setRowModesModel={setRowModesModel}
            setRows={setRows}
            setNewRow={setNewRow}
            newRow={newRow}
          />
        )
      },
    },
  ]
}

export const restructureVariables = (variables) => {
  return variables.map((variable) => {
    return {
      ...variable,
      variable: { id: variable?.variable_id, name: variable?.nombre_variable },
    }
  })
}
