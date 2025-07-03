import { inputTypeSaveForm, methodCallApi, sigedocCommunicationOptions } from '../../../hooks'
import { channelOptions } from '../../../funcs'

export const itemSelectCommnunications = {
  name: 'communications',
  label: 'Tipo de comunicacion en sigedoc',
  required: true,
  options: sigedocCommunicationOptions,
}

export const labelItemCallApi = {
  name: 'url',
  label: 'Ingresar url',
  required: true,
  type: 'text',
  validate: (value) => {
    if (!value) {
      return 'Debe digitar una url'
    }
    return true
  },
}

export const labelItemTitleCallApi = {
  name: 'title',
  label: 'Ingresar el titulo',
  type: 'text',
}

export const positionItemInput = {
  name: 'position',
  label: 'Posición',
  type: 'number',
}

export const methodItemCallApi = {
  label: 'Metodo del API',
  name: 'method',
  required: true,
  options: methodCallApi,
}

export const isEnabledItem = { name: 'isEnabled' }
export const isRequiredItem = { name: 'isRequired', label: 'Obligatorio' }

export const INPUTS_REVIEW_DOCUMENT = ({
  isDisabled,
  builderService,
  idProcessType,
  toggleDisabled,
  filterOptions,
}) => {
  return [
    {
      label: 'Posición',
      name: 'position',
      type: 'number',
      disabled: isDisabled,
      className: 'col-span-12 sm:col-span-2',
    },
    {
      label: 'Nombre del documento',
      name: 'idActionItemRel',
      required: true,
      type: 'autocompleteRequest',
      // TO-DO:
      // queryRequest: { querySearch: 'querySearch', additionalQuery: '&isActive=true' },
      disabled: isDisabled,
      requestprops: {
        isCompanyRequest: true,
        baseKey: builderService ?? 'urlProcess',
        url: `/process-types/${idProcessType}/util/resources`,
        requestOnInput: true,
      },
      vlprops: {
        usePagination: true,
        hasQuerySearch: true,
        shouldClose: true,
        toggleDisabled,
        columns: [
          {
            dataIndex: 'name',
            title: 'Nombre Documento',
            render: (_, row) => `${row?.name ?? ''}`,
          },
          {
            dataIndex: 'stage',
            title: 'Etapa',
            render: (_, row) => `${row?.nameStage ?? ''}`,
          },
          {
            dataIndex: 'activity',
            title: 'Actividad',
            render: (_, row) => `${row?.nameActivity ?? ''}`,
          },
          {
            dataIndex: 'action',
            title: 'Accion',
            render: (_, row) => `${row?.nameAction ?? ''}`,
          },
        ],
      },
      autocompleteprops: {
        getOptionLabel: (option) => `${option?.name ?? ''}`,
        filterOptions,
      },
      validate: false,
      className: 'col-span-12 sm:col-span-10',
    },
  ]
}

export const INPUTS_GENERATE_DOCUMENT = ({
  isDisabled = false,
  enabledInputTRD = false,
  toggleDisabledTemplate = () => {},
  filterOptionsTemplate = () => {},
}) => {
  const descriptionInput = {
    label: 'Descripción de la plantilla',
    name: 'description',
    type: 'multiline',
    disabled: isDisabled,
    multiline: true,
    minRows: 2,
    maxRows: 3,
    className: 'col-span-12',
  }

  const inputs = [
    {
      label: 'Posición',
      name: 'position',
      type: 'number',
      disabled: isDisabled,
      className: 'col-span-12 sm:col-span-2',
    },
    {
      label: 'Nombre del documento',
      name: 'name',
      required: true,
      type: 'text',
      disabled: isDisabled,
      className: 'col-span-12 sm:col-span-10',
    },
    {
      label: 'Plantilla de Documento',
      name: 'idTemplate',
      required: true,
      type: 'autocompleteRequest',
      queryRequest: { querySearch: 'querySearch' },
      disabled: isDisabled,
      requestprops: {
        isCompanyRequest: true,
        baseKey: 'urlDocuments',
        url: `/plantillas`,
        requestOnInput: true,
        counter: 'cantidadPlantillas',
      },
      vlprops: {
        usePagination: true,
        hasQuerySearch: true,
        shouldClose: true,
        toggleDisabled: toggleDisabledTemplate,
        columns: [
          {
            dataIndex: 'nombre',
            title: 'Nombre',
          },
        ],
      },
      autocompleteprops: {
        getOptionLabel: (option) => `${option?.nombre ?? ''}`,
        filterOptions: filterOptionsTemplate,
      },
      validate: false,
      className: 'col-span-12',
    },
  ]

  if (enabledInputTRD) {
    return [
      ...inputs,
      {
        label: 'Tabla de retencion documental',
        name: 'idDocumentRetentionTable',
        type: 'autocompleteRequest',
        queryRequest: { querySearch: 'querySearch' },
        disabled: isDisabled,
        requestprops: {
          isCompanyRequest: true,
          baseKey: 'urlDocuments',
          url: `/tablaRetencion/subSeries`,
          requestOnInput: true,
          counter: 'cantidad',
        },
        vlprops: {
          usePagination: true,
          hasQuerySearch: true,
          shouldClose: true,
          columns: [
            {
              dataIndex: 'numero',
              title: 'Numero',
            },
            {
              dataIndex: 'nombre',
              title: 'Nombre',
            },
          ],
        },
        autocompleteprops: {
          getOptionLabel: (option) => `${option?.nombre ?? ''}`,
        },
        validate: false,
        className: 'col-span-12',
      },
      descriptionInput,
    ]
  }

  return [...inputs, descriptionInput]
}

export const INPUTS_ASSINGMENT = ({
  idProcessType,
  builderService,
  isActor = false,
  isDisabled = false,
  isBackToPrevActivity = false,
}) => {
  // TO-DO: Mejora: Cuando no sea la action ASSIGNMENT_TO_USER poner
  // className: 'col-span-6' para el input de posicion y para el de actividad
  const activityInput = {
    label: 'Nombre de la actividad',
    name: 'idTaskRel',
    required: !isActor,
    type: 'autocompleteRequest',
    queryRequest: { querySearch: 'querySearch' },
    disabled: isDisabled,
    requestprops: {
      isCompanyRequest: true,
      baseKey: builderService ?? 'urlProcess',
      url: `/process-types/${idProcessType}/util/all-activities`,
      requestOnInput: false,
    },
    vlprops: {
      usePagination: false,
      hasQuerySearch: false,
      shouldClose: true,
      columns: [
        {
          dataIndex: 'stage',
          title: 'Etapa',
          render: (_, row) => `${row?.ParentTask?.name ?? ''}`,
        },
        {
          dataIndex: 'name',
          title: 'Actividad',
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
  }

  const inputs = []

  if (!isBackToPrevActivity) {
    inputs.push({
      label: 'Posición',
      name: 'position',
      type: 'number',
      disabled: isDisabled,
      className: 'col-span-12',
    })
  }

  if (isActor) {
    return [
      ...inputs,
      {
        label: 'Tipo de actor',
        name: 'idActorType',
        required: true,
        type: 'autocompleteRequest',
        disabled: isDisabled,
        requestprops: {
          isCompanyRequest: false,
          baseKey: builderService ?? 'urlProcess',
          url: `/actor-types`,
          requestOnInput: false,
        },
        vlprops: {
          usePagination: false,
          hasQuerySearch: false,
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
      activityInput,
    ]
  }

  return [...inputs, activityInput]
}

export const INPUTS_UPLOAD = ({ isDisabled = false }) => {
  return [
    {
      label: 'Posición',
      name: 'position',
      type: 'number',
      disabled: isDisabled,
      className: 'col-span-12 sm:col-span-2',
    },
    {
      label: 'Nombre del documento',
      name: 'name',
      required: true,
      type: 'text',
      disabled: isDisabled,
      className: 'col-span-12 sm:col-span-10',
    },
    {
      label: 'Descripción de la documento',
      name: 'description',
      type: 'multiline',
      disabled: isDisabled,
      multiline: true,
      minRows: 2,
      maxRows: 3,
      className: 'col-span-12',
    },
  ]
}

export const INPUTS_SAVE_FORM = ({ isDisabled = false }) => {
  return [
    {
      label: 'Posición',
      name: 'position',
      type: 'number',
      disabled: isDisabled,
      className: 'col-span-12 sm:col-span-2',
    },
    {
      label: 'Identificador del campo',
      name: 'variableName',
      required: true,
      type: 'text',
      disabled: isDisabled,
      className: 'col-span-12 sm:col-span-10',
    },
    {
      label: 'Tipo de Campo',
      name: 'variableType',
      type: 'select',
      required: true,
      disabled: isDisabled,
      className: 'col-span-12',
      options: inputTypeSaveForm,
    },
    {
      label: 'Nombre del dato',
      name: 'name',
      required: true,
      type: 'text',
      disabled: isDisabled,
      className: 'col-span-12',
    },
    {
      label: 'Descripción de la dato',
      name: 'description',
      type: 'multiline',
      disabled: isDisabled,
      multiline: true,
      minRows: 2,
      maxRows: 3,
      className: 'col-span-12',
    },
  ]
}

export const INPUTS_SUBPROCESS = ({ idApplication, builderService, isDisabled = false }) => {
  return [
    {
      label: 'Posición',
      name: 'position',
      type: 'number',
      disabled: isDisabled,
      className: 'col-span-12 sm:col-span-2',
    },
    {
      label: 'Tipos de procesos',
      name: 'idProcessTypeRel',
      required: true,
      type: 'autocompleteRequest',
      queryRequest: {
        querySearch: 'searchString',
        additionalQuery: `&idApplication=${idApplication}`,
      },
      disabled: isDisabled,
      requestprops: {
        isCompanyRequest: true,
        baseKey: builderService ?? 'urlProcess',
        url: `/process-types`,
      },
      vlprops: {
        shouldClose: true,
        columns: [
          {
            dataIndex: 'name',
            title: 'Tipo de proceso',
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
      className: 'col-span-12 sm:col-span-10',
    },
    {
      label: 'Descripción del tipo proceso',
      name: 'description',
      type: 'multiline',
      disabled: isDisabled,
      multiline: true,
      required: true,
      minRows: 2,
      maxRows: 3,
      className: 'col-span-12',
    },
  ]
}

export const INPUTS_NOTIFICATIONS = ({
  idProcessType,
  filterOptions,
  toggleDisabled,
  isDisabled,
  builderService,
  actionType,
}) => {
  const isRequired = actionType !== 'SEND_NOTIFICATION'

  const ITEM_REL_INPUT = {
    label: 'Actividad de Notificación de Revisión',
    name: 'idActionItemRel',
    required: isRequired,
    type: 'autocompleteRequest',
    disabled: isDisabled,
    requestprops: {
      isCompanyRequest: true,
      baseKey: builderService ?? 'urlProcess',
      url: `/process-types/${idProcessType}/util/resources/notifications`,
      requestOnInput: true,
    },
    vlprops: {
      usePagination: true,
      hasQuerySearch: true,
      shouldClose: true,
      toggleDisabled,
      columns: [
        {
          dataIndex: 'stage',
          title: 'Etapa',
          render: (_, row) => `${row?.nameStage ?? ''}`,
        },
        {
          dataIndex: 'activity',
          title: 'Actividad',
          render: (_, row) => `${row?.nameActivity ?? ''}`,
        },
        {
          dataIndex: 'action',
          title: 'Accion',
          render: (_, row) => `${row?.nameAction ?? ''}`,
        },
      ],
    },
    autocompleteprops: {
      getOptionLabel: (option) => `${option?.nameAction ?? ''}`,
      filterOptions,
    },
    validate: false,
    className: 'col-span-12',
  }

  const ITEMSPECS_INPUTS = [
    {
      name: 'actionItemSpecs.channel',
      label: 'Canal de Envío',
      type: 'select',
      required: isRequired,
      disabled: isDisabled,
      className: 'col-span-12',
      options: channelOptions,
    },
    {
      name: 'actionItemSpecs.defaultTo',
      label: 'Destinatario por defecto',
      type: 'text',
      disabled: isDisabled,
      className: 'col-span-12',
    },
    {
      name: 'actionItemSpecs.defaultEmailSender',
      label: 'Remitente por defecto',
      type: 'email',
      disabled: isDisabled,
      helperText: 'El correo electrónico debe estar registrado en el servicio de comunicaciones',
      className: 'col-span-12',
    },
    {
      name: 'actionItemSpecs.subject',
      label: 'Asunto de Envío',
      type: 'multiline',
      disabled: isDisabled,
      multiline: true,
      minRows: 3,
      maxRows: 4,
      className: 'col-span-12',
    },
  ]

  const result = {
    primaryInputs: [],
    secondaryInputs: [],
  }

  if (actionType === 'SEND_NOTIFICATION') {
    result.primaryInputs.push(ITEM_REL_INPUT)
    result.secondaryInputs = ITEMSPECS_INPUTS
  }

  if (actionType === 'REVIEW_NOTIFICATION') {
    result.primaryInputs.push(ITEM_REL_INPUT)
  }

  if (actionType === 'CREATE_NOTIFICATION') {
    result.primaryInputs = ITEMSPECS_INPUTS
  }

  return result
}

// TO-DO: Pendiente por definir
export const INPUTS_TYPE_SAVE_FORM = {
  shortText: [
    {
      name: 'actionItemSpecs.options.min',
      label: 'Minimo de caracteres permitidos',
      type: 'number',
      className: 'col-span-12 sm:col-span-6',
    },
    {
      name: 'actionItemSpecs.options.max',
      label: 'Maximo de caracteres permitidos',
      type: 'number',
      className: 'col-span-12 sm:col-span-6',
    },
  ],
  longText: [
    {
      name: 'actionItemSpecs.options.min',
      label: 'Minimo de caracteres permitidos',
      type: 'number',
      className: 'col-span-12 sm:col-span-6',
    },
    {
      name: 'actionItemSpecs.options.max',
      label: 'Maximo de caracteres permitidos',
      type: 'number',
      className: 'col-span-12 sm:col-span-6',
    },
  ],
  number: [],
  date: [],
  lov: [],
}
