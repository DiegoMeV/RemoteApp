import { MagicString } from '@/libV4'
import { createFilterOptions } from '@mui/material'
import dayjs from 'dayjs'

const useGetInputs = (watch) => {
  const grupo = watch('idGroup')
  const idProcessType = watch('idProcessType')
  const dateFrom = watch('dateFrom')

  const inputs = [
    {
      label: 'Grupo',
      name: `idGroup`,
      type: 'autocompleteRequest',
      disabled: idProcessType && !grupo?.id,
      queryRequest: { additionalQuery: '?status=all' },
      requestprops: {
        baseKey: 'urlProcess',
        url: '/process-type-groups',
        isPaginated: true,
      },
      vlprops: {
        usePagination: true,
        toolbarProps: { searchProps: {} },
        shouldClose: true,
        columns: [
          {
            dataIndex: 'name',
            title: 'Nombre de tipo de proceso',
            render: (_, row) => `${row?.name ?? ''}`,
          },
        ],
      },
      autocompleteprops: {
        getOptionLabel: (option) => `${option?.name ?? ''}`,
        filterOptions: createFilterOptions({
          ignoreCase: true,
          ignoreAccents: true,
        }),
      },
      validate: false,
      className: 'col-span-6 xs:col-span-6 sm:col-span-6',
    },
    {
      label: 'Tipo de proceso',
      name: `idProcessType`,
      type: 'autocompleteRequest',
      queryRequest: {
        querySearch: 'searchString',
        additionalQuery: grupo?.id ? `&idGroup=${grupo?.id}` : '',
      },
      requestprops: {
        baseKey: 'urlProcess',
        url: `/process-types`,
        isPaginated: true,
      },
      vlprops: {
        usePagination: true,
        hasQuerySearch: true,
        shouldClose: true,
        columns: [
          {
            dataIndex: 'name',
            title: 'Nombre de tipo de proceso',
            render: (_, row) => `${row?.name ?? ''}`,
          },
          {
            dataIndex: 'description',
            title: 'Descripción',
            render: (_, row) => `${row?.description ?? ''}`,
          },
        ],
      },
      autocompleteprops: {
        getOptionLabel: (option) => `${option?.name ?? ''}`,
      },
      validate: false,
      className: 'col-span-6 xs:col-span-6 sm:col-span-6',
    },
    {
      name: 'dateFrom',
      label: 'Fecha desde',
      type: 'date',
      validate: (value) => {
        const dateToValue = watch('dateTo')
        if (value && dateToValue) {
          const dateTo = new Date(dateToValue)
          const dateFrom = new Date(value)
          if (dateFrom > dateTo) {
            return 'La fecha desde no puede ser mayor a la fecha hasta'
          }
        }
        if (value && new Date(value) > new Date()) {
          return 'La fecha hasta no puede ser mayor a la fecha actual'
        }

        return true
      },
      datePickerProps: {
        dateFormat: MagicString.DATE_FORMAT.ORACLE_FORMAT,
      },
      maxDate: dayjs(new Date()),
      className: 'col-span-4',
    },
    {
      name: 'dateTo',
      label: 'Fecha hasta',
      type: 'date',
      // disabled: !dateFrom,
      validate: (value) => {
        const dateFromValue = watch('dateFrom')
        if (value && dateFromValue) {
          const dateFrom = new Date(dateFromValue)
          const dateTo = new Date(value)
          if (dateTo < dateFrom) {
            return 'La fecha hasta no puede ser menor a la fecha desde'
          }
        }
        if (value && new Date(value) > new Date()) {
          return 'La fecha hasta no puede ser mayor a la fecha actual'
        }

        return true
      },
      datePickerProps: {
        dateFormat: MagicString.DATE_FORMAT.ORACLE_FORMAT,
      },
      minDate: dateFrom,
      maxDate: dayjs(new Date()),
      className: 'col-span-4',
    },
    {
      name: 'status',
      label: 'Estado del proceso',
      type: 'select',
      options: [
        {
          value: 'NOTIFIED',
          label: 'Notificado',
        },
        {
          value: 'PROGRESS',
          label: 'En progreso',
        },
        {
          value: 'COMPLETED',
          label: 'Completado',
        },
        {
          value: 'INREVIEW',
          label: 'En revisión',
        },
        {
          value: 'REVIWED',
          label: 'Revisado',
        },
      ],
      className: 'col-span-4',
    },
  ]

  return inputs
}

export default useGetInputs
