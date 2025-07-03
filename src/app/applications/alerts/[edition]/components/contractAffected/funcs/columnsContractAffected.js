import { AutocompleteListValueDG, formatToLocaleDateString } from '@/lib'

const columnsListValue = [
  {
    field: 'identificador',
    headerName: 'Número de contrato',
    width: 200,
    valueGetter: (params) => {
      return `${params?.value}`
    },
  },
  {
    field: 'nombre_tipo_contrato',
    headerName: 'Modalidad de contratación',
    minWidth: 300,
    valueGetter: (params) => {
      return `${params?.value}`
    },
  },
  {
    field: 'client',
    headerName: 'Contratista',
    minWidth: 600,
    valueGetter: (params) => {
      return `${params?.row?.terceroEntidadInfo?.nombre_completo}`
    },
  },
  {
    field: 'contractor',
    headerName: 'Contratante',
    minWidth: 600,
    valueGetter: (params) => {
      return `${params?.row?.terceroInfo?.nombre_completo}`
    },
  },
  {
    field: 'valor',
    headerName: 'Valor inicial',
    width: 200,
    valueGetter: (params) => {
      return `${params?.value}`
    },
  },
  {
    field: 'valor_final_contratado',
    headerName: 'Valor final',
    width: 200,
    valueGetter: (params) => {
      return `${params?.value}`
    },
  },
]
export const selectAutocompleteContracts = (apiRef, props, newValue) => {
  const { id, field } = props
  apiRef.current.setEditCellValue({ id, field, value: newValue })
  apiRef.current.setEditCellValue({
    id,
    field: 'fecha_suscripcion',
    value: newValue?.fecha_suscripcion,
  })
  apiRef.current.setEditCellValue({
    id,
    field: 'valor_contrato',
    value: newValue?.valor_final_contratado,
  })
  apiRef.current.setEditCellValue({
    id,
    field: 'client',
    value: newValue?.terceroEntidadInfo?.nombre_completo,
  })
  apiRef.current.setEditCellValue({
    id,
    field: 'contractor',
    value: newValue?.terceroInfo?.nombre_completo,
  })
  apiRef.current.setEditCellValue({
    id,
    field: 'valor',
    value: newValue?.valor,
  })
}

export const columnsContractAffected = ({
  valueListContracts,
  contracts,
  loadingContracts,
  errorContracts,
  searchContract,
  handlePaginationModelChange,
  model,
}) => {
  const columns = [
    {
      field: 'contratoInfo',
      headerName: 'Número de contrato',
      editable: true,
      width: 200,
      valueGetter: (params) => {
        return `${params?.row?.contratoInfo?.identificador}`
      },
      renderEditCell: (params) => {
        return (
          <>
            {errorContracts ? (
              'Error al cargar los contratos'
            ) : (
              <AutocompleteListValueDG
                params={params}
                controlModal={valueListContracts}
                options={contracts?.data}
                onChange={selectAutocompleteContracts}
                loading={loadingContracts}
                columns={columnsListValue}
                searchText={searchContract}
                dataGrid={true}
                handlePaginationModelChange={handlePaginationModelChange}
                model={model}
              />
            )}
          </>
        )
      },
    },
    {
      field: 'client',
      headerName: 'Contratista',
      editable: true,
      width: 200,
      valueGetter: (params) => {
        return `${params.row?.contratoInfo?.terceroEntidadInfo?.nombre_completo ?? ''}`
      },
    },
    {
      field: 'contractor',
      headerName: 'Contratante',
      editable: true,
      width: 200,
      valueGetter: (params) => {
        return `${params.row?.contratoInfo?.terceroInfo?.nombre_completo ?? ''}`
      },
    },
    {
      field: 'fecha_suscripcion',
      headerName: 'Fecha suscripción',
      editable: true,
      renderCell: (params) => {
        return formatToLocaleDateString(params?.row?.contratoInfo?.fecha_suscripcion ?? '')
      },
      renderEditCell: (params) => {
        return formatToLocaleDateString(params?.row?.fecha_suscripcion) ?? ''
      },
      width: 100,
    },
    {
      field: 'valor',
      headerName: 'Valor inicial',
      editable: true,
      width: 100,
      valueGetter: (params) => {
        if (params?.row?.contratoInfo?.valor) {
          const valor = params?.row?.contratoInfo?.valor
          const formattedValue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(valor)
          return `${formattedValue ?? ''}`
        }
      },
      renderEditCell: (params) => {
        if (params?.row?.contratoInfo?.valor) {
          const valor = params?.row?.contratoInfo?.valor
          const formattedValue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(valor)
          return formattedValue ?? ''
        }
      },
    },
    {
      field: 'valor_contrato',
      headerName: 'Valor final',
      editable: true,
      width: 100,
      renderCell: (params) => {
        if (params?.row?.valor_contrato) {
          const valorContrato = params?.row?.valor_contrato
          const formattedValue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(valorContrato)
          return `${formattedValue ?? ''}`
        }
      },
      renderEditCell: (params) => {
        if (params?.row?.valor_contrato) {
          const valorContrato = params?.row?.valor_contrato
          const formattedValue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(valorContrato)
          return formattedValue ?? ''
        }
      },
    },
    {
      field: 'descripcion',
      headerName: 'Objeto',
      editable: true,
      width: 200,
      valueGetter: (params) => {
        return `${params?.row?.contratoInfo?.objeto ?? ''}`
      },
    },
  ]
  return columns
}
