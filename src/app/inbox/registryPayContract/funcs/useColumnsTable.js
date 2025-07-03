import {
  GenericAutocomplete,
  ValueListGlobal,
  useBoolean,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export const useColumnsTable = ({ apiRef }) => {
  const valueListContract = useBoolean()
  const searchContract = useSearch()
  const [model, setModel] = useState({ page: 0, pageSize: 50 })
  const urlContractsSiif = searchContract?.searchText
    ? `/apps-specific/contracts/lov-contracts/for-payments?searchString=${
        searchContract?.searchText ?? ''
      }&page=${model.page + 1}&rowsPerPage=${model.pageSize}`
    : `/apps-specific/contracts/lov-contracts/for-payments?page=${model.page + 1}&rowsPerPage=${
        model.pageSize
      }`

  const {
    data: contractsSiif,
    isFetching: loadingContracts,
    error,
  } = useQueryDynamicApi({
    url: urlContractsSiif,
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    delay: 500,
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
        field: 'contract',
        value: null,
      })
      apiRef.current.setEditCellValue({
        id,
        field: 'prefijo',
        value: null,
      })
      apiRef.current.setEditCellValue({
        id,
        field: 'tipoContrato',
        value: null,
      })
      apiRef.current.setEditCellValue({
        id,
        field: 'contratista',
        value: null,
      })
      apiRef.current.setEditCellValue({
        id,
        field: 'descripcion',
        value: null,
      })
      return
    }
    apiRef.current.setEditCellValue({ id, field, value: newValue })
    apiRef.current.setEditCellValue({
      id,
      field: 'prefijo',
      value: newValue.processData?.contractData?.prefijo,
    })
    apiRef.current.setEditCellValue({
      id,
      field: 'tipoContrato',
      value: newValue.processData?.contractData?.tipoContrato,
    })
    apiRef.current.setEditCellValue({
      id,
      field: 'contratista',
      value: newValue.processData?.contractData?.nombreCompletoTercero,
    })
    apiRef.current.setEditCellValue({
      id,
      field: 'descripcion',
      value: newValue.processData?.contractData?.descripcion,
    })
  }
  const toggleDisabled = (params) => {
    return (
      params?.row?.activeChildProcess && Object.keys(params?.row?.activeChildProcess).length > 0
    )
  }
  const tooltipOption = (params) => {
    if (
      params?.row?.activeChildProcess &&
      Object.keys(params?.row?.activeChildProcess).length > 0
    ) {
      const identifier = params?.row?.activeChildProcess?.identifier
        ? `Identificador: ${params?.row?.activeChildProcess?.identifier}`
        : ''
      const processType = params?.row?.activeChildProcess?.ProcessType?.name
        ? `Tipo de proceso: ${params?.row?.activeChildProcess?.ProcessType?.name}`
        : ''
      return (
        <div>
          <div>Ya hay un proceso en progreso</div>
          <div>{identifier}</div>
          <div>{processType}</div>
        </div>
      )
    } else {
      return 'Seleccionar contrato'
    }
  }
  return [
    {
      field: 'contract',
      headerName: 'Número contrato',
      minWidth: 200,
      editable: true,
      renderCell: (params) => {
        return params.row?.contract?.processData?.contractData?.nrodoc
      },
      renderEditCell: (params) => {
        return (
          <>
            <GenericAutocomplete
              value={params?.row?.contract}
              autocompleteProps={{
                options: contractsSiif?.data ?? [],
                loadingOptions: loadingContracts,
                openModal: () => {
                  valueListContract.handleShow()
                },
                onChange: (_, newValue) => selectAutocompleteContract(apiRef, params, newValue),
                getOptionLabel: (options) => {
                  return String(options?.processData?.contractData?.nrodoc)
                },
                getOptionDisabled: (option) => {
                  return option?.activeChildProcess &&
                    Object.keys(option.activeChildProcess).length > 0
                    ? true
                    : false
                },
              }}
              textFieldProps={{
                size: 'medium',
                placeholder: 'Buscar contrato',
                onChange: (e) => {
                  searchContract?.handleSearchText(e.target.value)
                },
              }}
            />
            <ValueListGlobal
              title={'Contratos Siif'}
              openOptions={valueListContract}
              searchOptions={searchContract}
              toggleDisabled={toggleDisabled}
              tooltipOption={tooltipOption}
              pagination={{
                rowCountState: contractsSiif?.totalRows ?? 0,
                paginationMode: 'server',
                paginationModel: model,
                handlePaginationModelChange: (model) => {
                  setModel(model)
                },
              }}
              rows={contractsSiif?.data ?? []}
              loading={loadingContracts}
              columns={[
                {
                  field: 'nrodoc',
                  headerName: 'Número contrato',
                  minWidth: 200,
                  valueGetter: (cellValues) => {
                    return cellValues.row?.processData?.contractData?.nrodoc
                  },
                },
                {
                  field: 'prefijo',
                  headerName: 'Prefijo',
                  minWidth: 100,
                  valueGetter: (cellValues) => {
                    return cellValues.row?.processData?.contractData?.prefijo
                  },
                },
                {
                  field: 'tipoContrato',
                  headerName: 'Tipo contrato',
                  minWidth: 100,
                  valueGetter: (cellValues) => {
                    return cellValues.row?.processData?.contractData?.tipoContrato
                  },
                },
                {
                  field: 'nombre',
                  headerName: 'Contratista',
                  minWidth: 100,
                  valueGetter: (cellValues) => {
                    return cellValues.row?.processData?.contractData?.nombreCompletoTercero
                  },
                },
                {
                  field: 'descripcion',
                  headerName: 'Objeto',
                  minWidth: 300,
                  renderCell: (cellValues) => (
                    <Box
                      sx={{
                        whiteSpace: 'normal',
                        overflow: 'auto',
                        maxHeight: '100px',
                        padding: '20px',
                        maxWidth: '600px',
                      }}
                    >
                      <Typography
                        variant='body2'
                        style={{ wordWrap: 'break-word', textAlign: 'justify' }}
                      >
                        {cellValues.row.processData?.contractData?.descripcion ?? ''}
                      </Typography>
                    </Box>
                  ),
                },
              ]}
              selectedOption={(props) => {
                selectAutocompleteContract(apiRef, params, props?.row)
              }}
            />
          </>
        )
      },
    },
    {
      field: 'prefijo',
      headerName: 'Prefijo',
      minWidth: 100,
      editable: true,
      renderEditCell: (params) => {
        return <div>{params.value}</div>
      },
    },
    {
      field: 'tipoContrato',
      headerName: 'Tipo contrato',
      minWidth: 200,
      editable: true,
      renderEditCell: (params) => {
        return <div>{params.value ?? ''}</div>
      },
    },
    {
      field: 'contratista',
      headerName: 'Contratista',
      minWidth: 200,
      editable: true,
      renderEditCell: (params) => {
        return <div>{params.value ?? ''}</div>
      },
    },
    {
      field: 'descripcion',
      headerName: 'Objeto',
      flex: 1,
      editable: true,
      renderCell: (cellValues) => (
        <Box
          sx={{
            whiteSpace: 'normal',
            overflow: 'auto',
            maxHeight: '100px',
            padding: '20px',
            maxWidth: '600px',
          }}
        >
          <Typography
            variant='body2'
            style={{ wordWrap: 'break-word', textAlign: 'justify' }}
          >
            {cellValues.value ?? ''}
          </Typography>
        </Box>
      ),
      renderEditCell: (params) => {
        return (
          <Box
            sx={{
              whiteSpace: 'normal',
              overflow: 'auto',
              maxHeight: '100px',
              padding: '20px',
              maxWidth: '600px',
            }}
          >
            <Typography
              variant='body2'
              style={{ wordWrap: 'break-word', textAlign: 'justify' }}
            >
              {params.value}
            </Typography>
          </Box>
        )
      },
    },
  ]
}
