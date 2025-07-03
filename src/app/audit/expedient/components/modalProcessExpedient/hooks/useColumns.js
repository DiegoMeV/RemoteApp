const useColumns = () => {
  const columns = [
    {
      key: 'identifier',
      nameColumn: 'identifier',
      dataIndex: 'identifier',
      title: 'Número',
    },
    {
      key: 'name',
      nameColumn: 'name',
      dataIndex: 'name',
      title: 'Nombre',
    },
    {
      key: 'player',
      nameColumn: 'player',
      dataIndex: 'player',
      title: 'Contribuyente',
    },
    {
      key: 'code',
      nameColumn: 'code',
      dataIndex: 'code',
      title: 'Código',
    },
  ]
  /* const options = {
    key: 'options',
    dataIndex: 'options',
    title: '',
    width: 50,
    pinned: 'right',
    render: (_, data) => (
      <EditOption
        onClick={() => {
          editData({
            prevData,
            data,
            idComponentForm,
            idForm,
            navigation,
            idApplication,
            restParams,
          })
        }}
      />
    ),
  } */
  return columns
}

export default useColumns
