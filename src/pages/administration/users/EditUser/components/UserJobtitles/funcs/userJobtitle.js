import { formatToLocaleDate } from '@/lib'

export const inputsUserJobtitles = (isNew) => [
  {
    name: 'jobTitleId',
    label: 'Cargo',
    type: 'autocompleteRequest',
    disabled: !isNew,
    requestprops: {
      baseKey: 'urlUsers',
      url: '/jobTitles',
    },
    queryRequest: {
      querySearch: 'querySearch',
    },
    vlprops: {
      shouldClose: true,
      columns: [
        {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
        },
      ],
    },
    required: true,
    className: 'col-span-12',
  },
  {
    name: 'hierarchyId',
    label: 'Dependencia',
    type: 'autocompleteRequest',
    disabled: !isNew,
    requestprops: {
      baseKey: 'urlUsers',
      url: '/hierarchy',
    },
    queryRequest: {
      querySearch: 'querySearch',
    },
    vlprops: {
      shouldClose: true,
      columns: [
        {
          title: 'Nombre',
          dataIndex: 'name',
        },
      ],
    },
    required: true,
    className: 'col-span-12',
  },
  {
    name: 'startedAt',
    label: 'Fecha de inicio',
    type: 'date',
    disabled: !isNew,
    disablePast: isNew,
    required: true,
    className: 'col-span-12',
  },
  {
    name: 'finishedAt',
    label: 'Fecha de fin',
    type: 'dateTime',
    disablePast: true,
    className: 'col-span-12',
  },
]

export const generalColumns = [
  {
    headerName: 'Nombre',
    field: 'name',
    renderCell: (data) => data?.jobTitle?.name,
  },
  {
    headerName: 'Dependencia',
    field: 'dependency',
    width: 150,
    renderCell: (data) => data?.dependency?.name,
  },
  {
    headerName: 'Fecha de inicio',
    field: 'startedAt',
    renderCell: (data) => formatToLocaleDate(data?.startedAt),
  },
  {
    headerName: 'Fecha de fin',
    field: 'finishedAt',
    renderCell: (data) => formatToLocaleDate(data?.finishedAt),
  },
]
