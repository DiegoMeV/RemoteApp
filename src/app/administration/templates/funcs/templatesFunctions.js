import { Article, Splitscreen } from '@mui/icons-material'

export const calculatePageRange = (pageCount, totalCount) => {
  const startRecord = (pageCount - 1) * 20 + 1
  const endRecord = Math.min(pageCount * 20, totalCount)
  const pageRange = `${startRecord} - ${endRecord} de ${totalCount}`
  return pageRange
}

export const getActionsActivityParams = ({ handleCancelModal }) => [
  {
    label: 'Cancelar',
    color: 'error',
    variant: 'contained',
    onClick: () => handleCancelModal(),
  },
  {
    label: 'Guardar',
    variant: 'contained',
    type: 'submit',
  },
]

export const onSubmitTemplates =
  ({ createTemplate, editVersionTemplate, setVersionInfo, form }) =>
  (data) => {
    const idCargos = data?.firmantesPorDefecto?.map((item) => ({ idCargo: item.id }))

    const relatedTemplates = data?.plantillasRelacionadas?.map((template) => {
      // eslint-disable-next-line no-unused-vars
      const { uuid, ...rest } = template
      return { ...rest, id: template?.id?.id ?? template?.id }
    })

    const vars = data?.variables?.map((variable) => {
      // eslint-disable-next-line no-unused-vars
      const { uuid, ...rest } = variable
      return { ...rest }
    })

    const infoToPush = new FormData()

    if (data?.idVersion) {
      data.file?.[0] ? infoToPush.append('file', data.file[0]) : null

      infoToPush.append('nombre', data.nombreVersion)
      infoToPush.append('estructuraNumero', data.estructuraNumero)

      const especificaciones = {
        variables: Object.values(vars ?? []) ?? [],
      }

      if (idCargos) {
        especificaciones.firmantesPorDefecto = idCargos
      }

      infoToPush.append('especificaciones', JSON.stringify(especificaciones))

      const valuesRelatedTemplates = Object.values(relatedTemplates ?? []) ?? []
      infoToPush.append('plantillasRelacionadas', JSON.stringify(valuesRelatedTemplates))

      if (infoToPush) {
        setVersionInfo((prevValues) => {
          if (prevValues) {
            return {
              ...prevValues,
              info: {
                ...prevValues.info,
                plantillasRelacionadas: valuesRelatedTemplates,
                especificaciones: { variables: Object.values(data?.variables ?? []) ?? [] },
              },
            }
          }
        })

        editVersionTemplate({ body: infoToPush })
      }
    } else {
      infoToPush.append('file', data.file[0])
      infoToPush.append('nombrePlantilla', data.nombrePlantilla)
      infoToPush.append('nombreVersion', data.nombreVersion)
      infoToPush.append('estructuraNumero', data.estructuraNumero)
      if (idCargos) {
        infoToPush.append('firmantesPorDefecto', JSON.stringify(idCargos))
      }
      infoToPush.append('variables', JSON.stringify(Object.values(vars ?? []) ?? []))

      const valuesRelatedTemplates = Object.values(relatedTemplates ?? []) ?? []
      infoToPush.append('plantillasRelacionadas', JSON.stringify(valuesRelatedTemplates))

      data?.idPlantilla && infoToPush.append('idPlantilla', data.idPlantilla)

      if (infoToPush) {
        createTemplate({ body: infoToPush })
      }
    }
    form.unregister()
  }

export const inputsInfoTemplate = ({ data = {}, index = '' } = {}) => {
  return [
    {
      name: `variables.${index}.orden`,
      label: 'Orden',
      defaultValue: data?.orden,
      type: 'number',
      required: true,
      space: 1,
      validate: false,
    },
    {
      name: `variables.${index}.nombre`,
      label: 'Nombre de la variable',
      defaultValue: data?.nombre,
      required: true,
      type: 'text',
      space: 5.5,
      validate: false,
    },
    {
      name: `variables.${index}.titulo`,
      label: 'Titulo de la variable',
      defaultValue: data?.titulo,
      required: true,
      type: 'text',
      space: 5.5,
      validate: false,
    },
    {
      name: `variables.${index}.tipo`,
      label: 'Tipo de variable',
      required: true,
      type: 'select',
      options: [
        { value: 'string', label: 'Texto' },
        { value: 'number', label: 'Número' },
        { value: 'html', label: 'html' },
        { value: 'date', label: 'Fecha' },
        { value: 'multiline', label: 'Área de texto' },
      ],
      defaultValue: data?.tipo,
      space: 3,
    },
    {
      name: `variables.${index}.valorInicial`,
      label: 'Valor inicial',
      defaultValue: data?.valorInicial,
      space: 6.5,
      validate: false,
    },
    {
      name: `variables.${index}.required`,
      label: 'Obligatoria',
      type: 'select',
      defaultValue: data?.required ?? false,
      options: [
        { value: true, label: 'Si' },
        { value: 'false', label: 'No' },
      ],
      space: 2,
    },
  ]
}

export const inputsReferenceTemplates = ({ data = {}, index = '' } = {}) => {
  return [
    {
      label: 'Plantillas',
      name: `plantillasRelacionadas.${index}.id`,
      required: true,
      defaultValue: data?.id,
      type: 'autocompleteRequest',
      queryRequest: { querySearch: 'querySearch' },
      requestprops: {
        baseKey: 'urlDocuments',
        url: '/plantillas',
      },
      vlprops: {
        usePagination: true,
        hasQuerySearch: true,
        shouldClose: true,
        columns: [
          {
            dataIndex: 'nombre',
            title: 'Nombre de la plantilla',
            render: (_, row) => `${row?.nombre ?? ''}`,
          },
        ],
      },
      autocompleteprops: {
        getOptionLabel: (option) => `${option?.nombre ?? ''}`,
      },
      validate: false,
      className: 'col-span-12 xs:col-span-12 sm:col-span-6',
    },
    {
      name: `plantillasRelacionadas.${index}.keyName`,
      label: 'Nombre de plantilla relacionada',
      required: true,
      type: 'text',
      defaultValue: data?.keyName,
      validate: false,
      className: 'col-span-12 xs:col-span-12 sm:col-span-6',
    },
  ]
}

export const templateTabs = [
  {
    value: 0,
    label: 'Variables',
    props: {
      icon: <Splitscreen />,
      iconPosition: 'end',
      sx: { display: 'flex', fontWeight: 'normal' },
    },
  },
  {
    value: 1,
    label: 'Referencias plantillas',
    props: {
      icon: <Article />,
      iconPosition: 'end',
      sx: { display: 'flex', fontWeight: 'normal' },
    },
  },
]
