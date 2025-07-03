import {
  CustomSwitchEditingDG,
  CustomTextFieldEditingDG,
  GenericChip,
} from '@/app/applications/components'
import OptionsRelationsTable from '@/app/applications/components/OptionsRelationsTable'
import { AutocompleteNoForm } from '@/lib'

export const useColumnsCriteria = ({
  rowModesModel,
  setRowModesModel,
  setNewRow,
  setRows,
  newRow,
  criteriaStates,
  selectAutocompleteCriterion,
  openModal,
  setRowParams,
  searchCriteria,
}) => {
  const { criteria, loadingCriterias } = criteriaStates
  return [
    {
      field: 'criterioInfo',
      headerName: 'Nombre',
      editable: true,
      width: 400,
      valueGetter: (params) => `${params.row?.criterioInfo?.nombre ?? ''}`,
      renderEditCell: (params) => {
        return (
          <AutocompleteNoForm
            openModal={() => {
              openModal()
              setRowParams(params)
            }}
            onChange={(newValue) => selectAutocompleteCriterion(params, newValue)}
            handleSearch={searchCriteria.handleSearchText}
            options={criteria?.data}
            isLoading={loadingCriterias}
            size='medium'
            placeholder='Buscar criterio'
            {...params}
          />
        )
      },
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      width: 400,
      valueGetter: (params) => `${params.row?.criterioInfo?.descripcion ?? ''}`,
      renderEditCell: (params) => <CustomTextFieldEditingDG {...params} />,
    },
    {
      field: 'activo',
      headerName: 'Estado',
      width: 100,
      editable: true,
      renderCell: (params) => {
        return <GenericChip params={params} />
      },
      renderEditCell: (params) => <CustomSwitchEditingDG {...params} />,
    },
    {
      field: 'options',
      headerName: '',
      width: 80,
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

export const restructureCriteria = (criteria) => {
  return criteria.map((criterion) => {
    return {
      ...criterion,
      criterion: {
        id: criterion?.id,
        nombre: criterion?.criterioInfo?.nombre,
        descripcion: criterion?.criterioInfo?.descripcion,
        activo: criterion?.activo,
      },
    }
  })
}
