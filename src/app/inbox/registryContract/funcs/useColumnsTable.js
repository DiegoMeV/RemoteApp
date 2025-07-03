import {
  GenericAutocomplete,
  ValueListGlobal,
  useBoolean,
  usePrivileges,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export const useColumnsTable = ({ form, apiRef }) => {
  const dependencia = form.watch('office')
  const [rowParams, setRowParams] = useState()
  const valueListContract = useBoolean()
  const searchContract = useSearch()
  const [model, setModel] = useState({ page: 0, pageSize: 50 })
  const privAllHierarchy = usePrivileges('siifweb.contratos.ver_todos_contratos')
  let baseUrl = `/app-specific/siif-web/gestion-gasto/contracts-lov`
  let params = `page=${model.page + 1}&rowsPerPage=${model.pageSize}`
  if (!privAllHierarchy) {
    params += `&dependencia=${dependencia?.identification}`
  }
  if (searchContract?.searchText) {
    params += `&searchString=${encodeURIComponent(searchContract.searchText)}`
  }

  // Combinar todo para formar la URL final
  const urlContracts = `${baseUrl}?${params}`

  const {
    data: contractsSiif,
    isFetching: loadingContracts,
    error,
  } = useQueryDynamicApi({
    url: urlContracts,
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
      value: newValue.prefijo,
    })
    apiRef.current.setEditCellValue({
      id,
      field: 'tipoContrato',
      value: newValue.tipoContrato,
    })
    apiRef.current.setEditCellValue({
      id,
      field: 'contratista',
      value: `${newValue.nombre ?? 'No registrado'} ${newValue.apellido1 ?? ''} ${
        newValue.apellido2 ?? ''
      }`,
    })
    apiRef.current.setEditCellValue({
      id,
      field: 'descripcion',
      value: newValue.descripcion,
    })
  }
  const contractsWithId = contractsSiif?.data?.map((contract) => {
    return { ...contract, id: crypto.randomUUID() }
  })

  return [
    {
      field: 'contract',
      headerName: 'Número contrato',
      minWidth: 200,
      editable: true,
      renderCell: (params) => {
        return params.row?.contract?.nrodoc
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
                  setRowParams(params)
                },
                onChange: (_, newValue) => selectAutocompleteContract(apiRef, params, newValue),
                getOptionLabel: (options) => {
                  return String(options?.nrodoc)
                },
              }}
              textFieldProps={{
                size: 'medium',
                placeholder: 'Buscar contratos',
                onChange: (e) => {
                  searchContract?.handleSearchText(e.target.value)
                },
              }}
            />
            <ValueListGlobal
              title={'Contratos Siif'}
              openOptions={valueListContract}
              searchOptions={searchContract}
              pagination={{
                rowCountState: contractsSiif?.totalRows ?? 0,
                paginationMode: 'server',
                paginationModel: model,
                handlePaginationModelChange: (model) => {
                  setModel(model)
                },
              }}
              rows={contractsWithId}
              loading={loadingContracts}
              columns={[
                {
                  field: 'nrodoc',
                  headerName: 'Número contrato',
                  minWidth: 200,
                },
                {
                  field: 'prefijo',
                  headerName: 'Prefijo',
                  minWidth: 100,
                },
                {
                  field: 'tipoContrato',
                  headerName: 'Tipo contrato',
                  minWidth: 100,
                },
                {
                  field: 'nombre',
                  headerName: 'Contratista',
                  minWidth: 100,
                  valueGetter: (params) => {
                    return `${params.row?.nombre ?? 'No registrado'} ${
                      params.row?.apellido1 ?? ''
                    } ${params.row?.apellido2 ?? ''}`
                  },
                },
                {
                  field: 'descripcion',
                  headerName: 'Objeto',
                  minWidth: 100,
                  renderCell: (cellValues) => (
                    <Box
                      sx={{
                        whiteSpace: 'normal',
                        overflow: 'auto',
                        maxHeight: '100px',
                        paddingY: '30px',
                        maxWidth: '400px',
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
                },
              ]}
              selectedOption={(params) => {
                selectAutocompleteContract(apiRef, rowParams, params.row)
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
      renderCell: (params) => {
        return params.row?.contract?.prefijo
      },
      renderEditCell: (params) => {
        return <div>{params.value}</div>
      },
    },
    {
      field: 'tipoContrato',
      headerName: 'Tipo contrato',
      minWidth: 100,
      editable: true,
      valueGetter: (params) => {
        return `${params.row?.contract?.tipoContrato ?? ''}`
      },
      renderEditCell: (params) => {
        return <div>{params.value ?? ''}</div>
      },
    },
    {
      field: 'contratista',
      headerName: 'Contratista',
      minWidth: 200,
      editable: true,
      valueGetter: (params) => {
        return `${params.row?.contract?.nombre ?? 'No registrado'} ${
          params.row?.contract?.apellido1 ?? ''
        } ${params.row?.contract?.apellido2 ?? ''}`
      },
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
