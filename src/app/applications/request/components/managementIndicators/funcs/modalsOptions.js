const modalsOptions = (paramsModals) => {
  const { lovAnalyst, lovHierarchy, lovUseInformation, setValue } = paramsModals
  const selectValueList = (params, input) => {
    setValue(input, params.row)
  }
  const columnsAnalyst = [
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      valueGetter: (params) => `${params.row.firstName + ' ' + (params.row.lastName ?? '')}`,
    },
  ]
  const columnsValueListInfo = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 500,
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      flex: 1,
    },
  ]
  const columnsValueListHierarchy = [
    {
      field: 'name',
      headerName: 'Nombre',
      width: 300,
    },
    {
      field: 'createdAt',
      headerName: 'Fecha de creación',
      width: 300,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleString()
      },
    },
    {
      field: 'updatedAt',
      headerName: 'Fecha de actualización',
      width: 300,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleString()
      },
    },
  ]
  return [
    {
      open: lovAnalyst?.controlModal,
      title: 'Analista',
      columns: columnsAnalyst,
      rows: lovAnalyst?.dataList?.data,
      loading: lovAnalyst?.isLoading,
      selectedOption: (params) => selectValueList(params, 'idAnalyst'),
      searchOptions: lovAnalyst?.controlSearch,
    },
    {
      open: lovUseInformation?.controlModal,
      title: 'Uso de la información',
      columns: columnsValueListInfo,
      rows: lovUseInformation?.dataList?.data,
      loading: lovUseInformation?.isLoading,
      selectedOption: (params) => selectValueList(params, 'useInformation'),
      searchOptions: lovUseInformation?.controlSearch,
    },
    {
      open: lovHierarchy?.controlModal,
      title: 'Delegada / Entidad solicitante',
      columns: columnsValueListHierarchy,
      rows: lovHierarchy?.dataList?.data,
      loading: lovHierarchy?.isLoading,
      selectedOption: (params) => selectValueList(params, 'delegateApplicantEntity'),
      searchOptions: lovHierarchy?.controlSearch,
    },
  ]
}
export default modalsOptions
