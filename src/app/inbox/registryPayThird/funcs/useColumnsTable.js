import {
  GenericAutocomplete,
  ValueListGlobal,
  useBoolean,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export const useColumnsTable = ({ form, apiRef }) => {
  const dependencia = form.watch('office')
  const valueListContract = useBoolean()
  const searchThird = useSearch()
  const [model, setModel] = useState({ page: 0, pageSize: 50 })
  const urlThirds = searchThird?.searchText
    ? `/app-specific/siif-web/gestion-gasto/thirdparties-lov?page=${model.page + 1}&rowsPerPage=${
        model.pageSize
      }&searchString=${searchThird?.searchText}`
    : `/app-specific/siif-web/gestion-gasto/thirdparties-lov?page=${model.page + 1}&rowsPerPage=${
        model.pageSize
      }`

  const {
    data: thirdSiif,
    isFetching: loadingContracts,
    error,
  } = useQueryDynamicApi({
    url: urlThirds,
    isCompanyRequest: true,
    baseKey: 'urlApps',
    enabled: !!dependencia,
  })
  useEffect(() => {
    if (error) {
      toast.error(error?.response?.data?.error ?? 'Error al cargar los contratos')
    }
  }, [error])

  const selectAutocompleteContract = (apiRef, props, newValue) => {
    const { id, field } = props
    if (!newValue) {
      apiRef.current.setEditCellValue({
        id,
        field: 'third',
        value: null,
      })
      apiRef.current.setEditCellValue({
        id,
        field: 'teceroType',
        value: null,
      })

      return
    }
    apiRef.current.setEditCellValue({ id, field, value: newValue })
    apiRef.current.setEditCellValue({ id, field: 'teceroType', value: newValue.terceroType })
  }
  const thirdWithId = thirdSiif?.data?.map((contract) => {
    return { ...contract, id: crypto.randomUUID() }
  })

  return [
    {
      field: 'third',
      headerName: 'Nombre tercero',
      flex: 1,
      editable: true,
      renderCell: (params) => {
        return `${params.row?.third?.nombre ?? ''} ${params.row?.third?.apellido1 ?? ''} ${
          params.row?.third?.apellido2 ?? ''
        }`
      },
      renderEditCell: (params) => {
        return (
          <>
            <GenericAutocomplete
              autocompleteProps={{
                isOptionEqualToValue: (option, value) => option?.tercero === value?.tercero,
                value: params.value ?? '',
                getOptionLabel: (options) => options?.nombreCompletoTercero ?? '',
                openModal: () => {
                  valueListContract.handleShow()
                },
                options: thirdSiif?.data ?? [],
                loadingOptions: loadingContracts,
                onChange: (_, newValue) => selectAutocompleteContract(apiRef, params, newValue),
              }}
              textFieldProps={{
                size: 'medium',
                placeholder: 'Buscar terceros',
                onChange: (e) => {
                  searchThird?.handleSearchText(e.target.value)
                },
              }}
            />
            <ValueListGlobal
              title={'Terceros Siif'}
              openOptions={valueListContract}
              searchOptions={searchThird}
              pagination={{
                rowCountState: thirdSiif?.totalRows ?? 0,
                paginationMode: 'server',
                paginationModel: model,
                handlePaginationModelChange: (model) => {
                  setModel(model)
                },
              }}
              rows={thirdWithId}
              loading={loadingContracts}
              columns={[
                {
                  field: 'nombre',
                  headerName: 'Tercero',
                  minWidth: 100,
                  valueGetter: (params) => {
                    return params.row?.nombreCompletoTercero ?? ''
                  },
                },
                {
                  field: 'terceroType',
                  headerName: 'Tipo tercero',
                  minWidth: 100,
                },
                {
                  field: 'tercero',
                  headerName: 'Número de identificación',
                  minWidth: 100,
                },
              ]}
              selectedOption={(data) => {
                selectAutocompleteContract(apiRef, params, data?.row)
              }}
            />
          </>
        )
      },
    },
    {
      field: 'teceroType',
      headerName: 'Tipo tercero',
      flex: 1,
      editable: true,
    },
  ]
}
