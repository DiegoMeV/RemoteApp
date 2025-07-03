import { AutocompleteNoForm } from '@/lib'

import {
  selectAutocompleteCities,
  selectAutocompleteDepartments,
} from './selectValueAutocompleteDG'

export const columnsRegions = ({
  apiRef,
  valueListCities,
  cities,
  loadingRows,
  searchCities,
  searchDepartments,
  valueListDepartments,
  infoProvince,
  setRowParams,
  setIdProvince,
}) => {
  const onChangeProvince = (newValue, params) => {
    selectAutocompleteDepartments(apiRef, params, newValue)
    if (!newValue) {
      setIdProvince(null)
      return
    }
    setIdProvince(newValue?.id)
  }

  const columns = [
    {
      field: 'regionInfo',
      headerName: 'Region',
      width: 300,
      editable: true,
      valueGetter: (params) => `${params?.row?.departamentoInfo?.regionInfo?.nombre ?? ''}`,
      renderEditCell: (params) => params?.row?.regionInfo?.nombre ?? '',
    },
    {
      field: 'sateliteInfo',
      headerName: 'Satelital',
      width: 300,
      editable: true,
      valueGetter: (params) => `${params?.row?.departamentoInfo?.sateliteInfo?.nombre ?? ''}`,
      renderEditCell: (params) => params?.row?.sateliteInfo?.nombre ?? '',
    },
    {
      field: 'departamentoInfo',
      headerName: 'Departamento',
      editable: true,
      width: 350,
      valueGetter: (params) => {
        return `${params?.row?.departamentoInfo?.nombre ?? ''}`
      },
      renderEditCell: (params) => {
        return (
          <AutocompleteNoForm
            options={infoProvince?.data}
            onChange={(newValue) => onChangeProvince(newValue, params)}
            handleSearch={searchDepartments.handleSearchText}
            isLoading={loadingRows}
            openModal={() => {
              valueListDepartments?.handleShow()
              setRowParams(params)
            }}
            {...params}
          />
        )
      },
    },
    {
      field: 'municipioInfo',
      headerName: 'Municipio',
      width: 350,
      editable: true,
      valueGetter: (params) => {
        return `${params?.row?.municipioInfo?.nombre ?? ''}`
      },
      renderEditCell: (params) => {
        return (
          <AutocompleteNoForm
            options={cities?.data}
            onChange={(newValue) => selectAutocompleteCities(apiRef, params, newValue)}
            handleSearch={searchCities.handleSearchText}
            isLoading={loadingRows}
            openModal={() => {
              valueListCities?.handleShow()
              setRowParams(params)
            }}
            {...params}
          />
        )
      },
    },
  ]
  return columns
}

export const valueListRegions = (
  apiRef,
  rowParams,
  valueListDepartments,
  searchDepartments,
  infoProvince,
  loadingRows,
  valueListCities,
  searchCities,
  cities,
  setIdProvince,
  model,
  handlePaginationModelChange
) => {
  return [
    {
      title: 'Departamentos',
      openOptions: valueListDepartments,
      searchOptions: searchDepartments,
      rows: infoProvince?.data,
      loading: loadingRows,
      columns: [
        {
          field: 'nombre',
          headerName: 'Departamento',
          minWidth: 250,
        },
        {
          field: 'nombre_region',
          headerName: 'Región',
          minWidth: 250,
        },
      ],
      selectedOption: (params) => {
        selectAutocompleteDepartments(apiRef, rowParams, params.row)
        setIdProvince(params.row.id)
      },
    },
    {
      title: 'Municipios',
      openOptions: valueListCities,
      searchOptions: searchCities,
      rows: cities?.data,
      loading: loadingRows,
      columns: [
        {
          field: 'nombre',
          headerName: 'Municipio',
          minWidth: 250,
        },
        {
          field: 'nombre_departamento',
          headerName: 'Departamento',
          minWidth: 250,
          valueGetter: (params) => `${params?.row?.departamentoInfo?.nombre ?? ''}`,
        },
        {
          field: 'nombre_region',
          headerName: 'Región',
          minWidth: 250,
          valueGetter: (params) => `${params?.row?.departamentoInfo?.infoRegion?.nombre ?? ''}`,
        },
      ],
      selectedOption: (params) => selectAutocompleteCities(apiRef, rowParams, params.row),
      pagination: {
        rowCountState: cities?.paginacion?.total ?? 0,
        paginationMode: 'server',
        paginationModel: model,
        handlePaginationModelChange: (model) => {
          handlePaginationModelChange(model)
        },
      },
    },
  ]
}
