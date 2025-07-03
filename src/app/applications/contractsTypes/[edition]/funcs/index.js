export * from './updateContractTypes'

import { CustomSwitchEditingDG, GenericChip } from '@/app/applications/components'
import OptionsRelationsTable from '@/app/applications/components/OptionsRelationsTable'
import { AutocompleteNoForm } from '@/lib'
import { GenericSwitch } from '@/lib/ui/genericInputs'
import { Chip } from '@mui/material'

export const columnsVariables = (
  rowModesModel,
  setRowModesModel,
  setNewRow,
  setRows,
  newRow,
  apiRef,
  variableOptions
) => {
  const {
    modalVariables,
    variablesLOV,
    loadingVariables,
    searchVariable,
    setRowParams,
    selectAutocompleteValue,
  } = variableOptions

  return [
    {
      field: 'variable',
      headerName: 'Variable',
      editable: true,
      width: 300,
      valueGetter: (params) => `${params.row?.variable?.name ?? ''}`,
      renderEditCell: (params) => (
        <AutocompleteNoForm
          value={params.value}
          options={variablesLOV?.data}
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
      field: 'requerido',
      headerName: 'Requerido',
      editable: true,
      width: 400,
      renderCell: (params) => {
        return (
          <Chip
            variant='outlined'
            color={params?.row?.requerido ? 'primary' : 'error'}
            label={params?.row?.requerido ? 'Requerido' : 'No requerido'}
          />
        )
      },
      renderEditCell: (params) => {
        const onChange = (event) => {
          apiRef.current.setEditCellValue({
            id: params.id,
            field: 'requerido',
            value: event.target.checked,
          })
        }
        return (
          <GenericSwitch
            formControlProps={{ onChange }}
            switchProps={{ defaultChecked: params.value }}
          />
        )
      },
    },
    {
      field: 'activo',
      headerName: 'Estado',
      editable: true,
      width: 100,
      renderCell: (params) => <GenericChip params={params} />,
      renderEditCell: (params) => <CustomSwitchEditingDG {...params} />,
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
      variable: {
        id: variable?.variableInfo?.id,
        name: variable?.variableInfo?.nombre,
      },
    }
  })
}
