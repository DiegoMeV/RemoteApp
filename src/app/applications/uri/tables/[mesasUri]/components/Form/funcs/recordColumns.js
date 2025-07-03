const recordColumns = () => {
  const columns = [
    {
      field: 'sigedoc_inclusion',
      headerName: 'Sigedoc inclusíon',
      width: 200,
      valueGetter: (params) => `${params?.row?.sigedoc_inclusion ?? ''}`,
    },
    {
      field: 'caso_individual_cat',
      headerName: 'Caso individual (CAT)',
      width: 200,
      valueGetter: (params) => `${params?.row?.caso_individual_cat ?? ''}`,
    },
    {
      field: 'numero_contrato',
      headerName: 'Numero contrato',
      width: 200,
      valueGetter: (params) => `${params?.row?.numero_contrato ?? ''}`,
    },
    {
      field: 'bpin',
      headerName: 'BPIN',
      width: 200,
      valueGetter: (params) => `${params?.row?.bpin ?? ''}`,
    },
  ]

  return columns
}
export default recordColumns
