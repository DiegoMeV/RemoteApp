const useColumns = () => {
  const columns = [
    {
      field: 'nrodoc',
      headerName: 'Número de documento',
      width: 60,
    },
    {
      field: 'nro_comprobantepptal',
      headerName: 'Número comprobante',
      width: 60,
    },
    {
      field: 'concepto',
      headerName: 'Concepto',
      width: 600,
    },
    {
      field: 'tipo_compptal',
      headerName: 'Tipo de comprobante',
      width: 200,
    },
    {
      field: 'prefijo',
      headerName: 'Prefijo',
    },
  ]
  return columns
}

export default useColumns
