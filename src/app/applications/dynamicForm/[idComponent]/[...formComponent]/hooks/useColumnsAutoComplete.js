const useColumnsAutoComplete = ({ data }) => {
  const columns =
    data?.map((item, index) => ({
      field: item?.source || `${index}`,
      headerName: item?.label || '',
      minWidth: 250,
    })) || []

  return data ? columns : []
}

export default useColumnsAutoComplete
