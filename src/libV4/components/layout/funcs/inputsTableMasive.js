export const inputs = [
  {
    name: 'source',
    label: 'Origen',
    type: 'select',
    options: [
      {
        value: 'ORACLE',
        label: 'ORACLE',
      },
      {
        value: 'SYNCHROX',
        label: 'SYNCHROX',
      },
    ],
    className: 'general_form_item',
  },
  {
    name: 'aplication',
    label: 'Aplicación',
    type: 'autocompleteRequest',
    requestprops: {
      isCompanyRequest: true,
      baseKey: 'urlApps',
      url: 'application',
    },
    autocompleteprops: {
      getOptionLabel: (option) => option?.fullName ?? '',
    },
    vlprops: {
      columns: [{ field: 'fullName', headerName: 'Nombre', width: 200 }],
      title: 'Aplicaciones',
    },
    queryRequest: {
      querySearch: 'querySearch',
    },
    className: 'general_form_item',
  },
]
