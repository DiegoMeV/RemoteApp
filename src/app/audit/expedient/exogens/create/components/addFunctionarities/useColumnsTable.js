import {
  GenericAutocomplete,
  GenericTextfield,
  ValueListGlobal,
  useBoolean,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export const useColumnsTable = ({ apiRef }) => {
  const searchThird = useSearch()
  const valueListFunctionaritie = useBoolean()
  const onChangePercentage = (id, field, newValue) => {
    if (newValue < 0 || newValue > 100) {
      return
    }
    apiRef.current.setEditCellValue({ id, field, value: newValue })
  }
  const [model, setModel] = useState({ page: 0, pageSize: 50 })
  const urlThirds = searchThird?.searchText
    ? `/users?querySearch=${searchThird?.searchText}&rowsPerPage=${model.pageSize}&isActive=true`
    : `/users?rowsPerPage=${model.pageSize}&isActive=true`

  const {
    data: functionarities,
    isFetching: loadingFunctionarities,
    error,
  } = useQueryDynamicApi({
    url: urlThirds,
    isCompanyRequest: true,
    baseKey: 'urlUsers',
  })
  useEffect(() => {
    if (error) {
      toast.error(error?.response?.data?.error ?? 'Error al cargar los funcionarios')
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
      return
    }
    apiRef.current.setEditCellValue({ id, field, value: newValue })
  }
  //   const thirdWithId = thirdSiif?.data?.map((contract) => {
  //     return { ...contract, id: crypto.randomUUID() }
  //   })

  return [
    {
      field: 'order',
      headerName: 'Orden',
      type: 'number',
      width: 100,
      editable: true,
    },
    {
      field: 'third',
      headerName: 'Nombre funcionario',
      flex: 1,
      editable: true,
      renderCell: (params) => {
        if (params.row?.third?.firstName) {
          return `${params.row?.third?.firstName ?? ''} ${params.row?.third?.lastName ?? ''}`
        }
        return `${params.row?.third ?? ''}`
      },
      renderEditCell: (params) => {
        return (
          <>
            <GenericAutocomplete
              autocompleteProps={{
                isOptionEqualToValue: (option, value) => {
                  return option?.id === value?.id
                },
                value: params.value ?? '',
                getOptionLabel: (options) => {
                  return ` ${options?.firstName ?? ''}${
                    options?.lastName ? ` ${options?.lastName}` : ''
                  }`
                },
                openModal: () => {
                  valueListFunctionaritie.handleShow()
                },
                options: functionarities?.data ?? [],
                loadingOptions: loadingFunctionarities,
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
              title={'Funcionarios'}
              openOptions={valueListFunctionaritie}
              searchOptions={searchThird}
              pagination={{
                rowCountState: functionarities?.totalRows ?? 0,
                paginationMode: 'server',
                paginationModel: model,
                handlePaginationModelChange: (model) => {
                  setModel(model)
                },
              }}
              rows={functionarities?.data}
              loading={loadingFunctionarities}
              columns={[
                {
                  field: 'nombre',
                  headerName: 'Nombre',
                  width: 200,
                  valueGetter: (params) => {
                    return `${params.row?.firstName ?? ''} ${params.row?.lastName ?? ''}`
                  },
                },
              ]}
              selectedOption={(data) => {
                selectAutocompleteContract(apiRef, params, data.row)
              }}
            />
          </>
        )
      },
    },
    {
      field: 'percentage',
      headerName: 'Porcentaje',
      type: 'number',
      width: 200,
      editable: true,
      renderCell: (params) => <Typography variant='body2'>{params?.value ?? ''}%</Typography>,
      renderEditCell: ({ id, field, value }) => (
        <GenericTextfield
          size='medium'
          type='number'
          value={value}
          onChange={(e) => onChangePercentage(id, field, e.target.value)}
          InputProps={{
            endAdornment: '%',
          }}
        />
      ),
    },
  ]
}
