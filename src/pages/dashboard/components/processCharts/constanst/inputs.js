import { statusProcessServices } from '@/app/builder/[idProcessType]/hooks'

export const inputsFilters = () => {
  return [
    {
      label: 'Tipo de proceso',
      name: 'idProcessType',
      type: 'autocompleteRequest',
      queryRequest: { querySearch: 'searchString' },
      requestprops: {
        isCompanyRequest: true,
        baseKey: 'urlProcess',
        url: `/process-types`,
        requestOnInput: true,
        counter: 'count',
      },
      vlprops: {
        usePagination: true,
        hasQuerySearch: true,
        shouldClose: true,
        columns: [
          {
            dataIndex: 'name',
            title: 'Nombre',
          },
          {
            dataIndex: 'description',
            title: 'Descripción',
          },
        ],
      },
      autocompleteprops: {
        getOptionLabel: (option) => `${option?.name ?? ''}`,
      },
      validate: false,
      className: 'col-span-12',
    },
    {
      label: 'Estado de proceso',
      name: 'status',
      type: 'select',
      options: statusProcessServices?.process ?? [],
      className: 'col-span-12',
    },
  ]
}
