import {
  GenericAutocomplete,
  ValueListGlobal,
  useBoolean,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export const useColumnsTable = ({ apiRef }) => {
  const valueListContract = useBoolean()
  const searchContract = useSearch()
  const [model, setModel] = useState({ page: 0, pageSize: 50 })
  const urlContractsSiif = searchContract?.searchText
    ? `/apps-specific/contracts/lov-processes/for-payments?searchString=${
        searchContract?.searchText ?? ''
      }&page=${model.page + 1}&rowsPerPage=${model.pageSize}`
    : `/apps-specific/contracts/lov-processes/for-payments?page=${model.page + 1}&rowsPerPage=${
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
        field: 'processParent',
        value: null,
      })
      apiRef.current.setEditCellValue({
        id,
        field: 'typeProcess',
        value: null,
      })
      apiRef.current.setEditCellValue({
        id,
        field: 'contratista',
        value: null,
      })
      return
    }
    const actorName = `${newValue?.contractorData?.userActorData?.firstName ?? ''} ${
      newValue?.contractorData?.userActorData?.lastName ?? ''
    }`

    apiRef.current.setEditCellValue({ id, field, value: newValue })
    apiRef.current.setEditCellValue({
      id,
      field: 'typeProcess',
      value: newValue.ProcessType?.name,
    })
    apiRef.current.setEditCellValue({
      id,
      field: 'contratista',
      value: actorName,
    })
    // Todo : tipo de proceso y contratista
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
      field: 'processParent',
      headerName: 'Identificador',
      width: 300,
      editable: true,
      renderCell: (params) => {
        return params.row?.processParent?.identifier
      },
      renderEditCell: (params) => {
        return (
          <>
            <GenericAutocomplete
              value={params?.row?.processParent}
              autocompleteProps={{
                options: contractsSiif?.data ?? [],
                loadingOptions: loadingContracts,
                openModal: () => {
                  valueListContract.handleShow()
                },
                onChange: (_, newValue) => selectAutocompleteContract(apiRef, params, newValue),
                getOptionLabel: (options) => {
                  return String(options?.identifier)
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
                placeholder: 'Buscar proceso',
                onChange: (e) => {
                  searchContract?.handleSearchText(e.target.value)
                },
              }}
            />
            <ValueListGlobal
              title={'Procesos'}
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
                  field: 'identifier',
                  headerName: 'Identificador',
                  width: 200,
                },
                {
                  field: 'typeProcess',
                  headerName: 'Tipo de proceso',
                  width: 200,
                  valueGetter: (cellValues) => {
                    return cellValues.row?.ProcessType?.name
                  },
                },
                {
                  field: 'nombre',
                  headerName: 'Contratista',
                  width: 200,
                  valueGetter: (cellValues) => {
                    const actorName = `${
                      cellValues?.row?.contractorData?.userActorData?.firstName ?? ''
                    } ${cellValues?.row?.contractorData?.userActorData?.lastName ?? ''}`
                    return actorName
                  },
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
      field: 'typeProcess',
      headerName: 'Tipo de proceso',
      width: 300,
      editable: true,
      renderEditCell: (params) => {
        return <div>{params.value ?? ''}</div>
      },
    },
    {
      field: 'contratista',
      headerName: 'Contratista',
      width: 300,
      editable: true,
      renderEditCell: (params) => {
        return <div>{params.value ?? ''}</div>
      },
    },
  ]
}
