// TO-DO: Rename this file to inputsBuilder.js
import { MagicString } from '@/lib'
import { DeleteOutlined, Save } from '@mui/icons-material'

// TO-DO: DELETE THIS FUNCTION AND USE THE FUNCTION FROM THE FILE funcsAction.js
export const iconActions = (handleDeleteElement, action, element) => {
  return [
    {
      title: MagicString.CONSTRUCTOR.SAVE_ELEMENT,
      icon: <Save />,
      type: 'submit',
    },
    {
      title: MagicString.CONSTRUCTOR.DELETE_ELEMENT,
      icon: <DeleteOutlined />,
      onClick: () => {
        handleDeleteElement(action, element)
      },
      hoverColor: 'red',
    },
  ]
}

// TO-DO: DELETE THIS FUNCTION AND USE THE FUNCTION FROM THE FILE funcsAction.js
export const actionsModal = ({ modal }) => {
  return [
    {
      label: 'Cancelar',
      onClick: modal?.handleShow,
      color: 'secondary',
    },
    {
      label: 'Guardar',
      type: 'submit',
    },
  ]
}

// TO-DO: Change the structure name of this inputs, data isn't the good solution
export const stageItemInputs = ({ isDisabled, isFiscalService, toggleDisabled = () => {} }) => {
  const generalInputs = [
    {
      label: 'Nombre de la etapa',
      disabled: isDisabled,
      // TO-DO: Quitarle data.label
      name: 'data.label',
      required: true,
      className: 'col-span-12 xs:col-span-12 sm:col-span-12',
    },
    {
      label: 'Descripción',
      disabled: isDisabled,
      name: 'data.description',
      type: 'multiline',
      minRows: 2,
      maxRows: 4,
      multiline: true,
      className: 'col-span-12 xs:col-span-12 sm:col-span-12',
    },
  ]
  if (isFiscalService) {
    const inputs = ITEMS_PROCESS_TRANSFER({
      isDisabled,
      name: 'data.idOfficeExec',
      isRequired: false,
      label: 'Dependencia que gestiona',
      toggleDisabled,
    })
    return [...generalInputs, ...inputs]
  }

  return [...generalInputs]
}

//ActionItems Inputs

export const ITEMS_AUTOMATIC_ACTION_EV = ({ isDisabled }) => {
  return [
    {
      name: 'actionItemSpecs.automatedTaskParams.taskBody',
      label: 'Código',
      type: 'code',
      required: true,
      height: 'calc(100vh - 400px)',
      enableFormatButton: true,
      disabled: isDisabled,
      sm: 12,
      space: 12,
    },
  ]
}

export const ITEMS_CALL_ORACLE_FORM = ({ isDisabled, options = [] }) => {
  return [
    {
      name: 'position',
      label: 'Posición',
      type: 'number',
      disabled: isDisabled,
      sm: 2,
      space: 2,
    },
    {
      name: 'name',
      label: 'Nombre del documento',
      required: true,
      type: 'text',
      disabled: isDisabled,
      sm: 10,
      space: 10,
    },
    {
      name: 'actionItemSpecs.oracleFormCall.module',
      label: 'Módulo de Oracle',
      required: true,
      type: 'select',
      disabled: isDisabled,
      options: options,
      sm: 12,
      space: 12,
    },
    {
      name: 'actionItemSpecs.oracleFormCall.option',
      label: 'Opción de Oracle',
      required: true,
      type: 'number',
      disabled: isDisabled,
      sm: 12,
      space: 12,
    },
    {
      name: 'actionItemSpecs.oracleFormCall.genDoc',
      label: 'Generar documento',
      type: 'switch',
      disabled: isDisabled,
      xs: 6,
    },
  ]
}

export const ITEMS_SIIFWEB_BIND_FINANTIAL_DOC = ({ isDisabled = false, options = [] } = {}) => {
  return [
    {
      label: 'Posición',
      name: 'position',
      type: 'number',
      sm: 2,
      space: 2,
    },
    {
      type: 'select',
      name: 'actionItemSpecs.siifwebData.voucherType',
      label: 'Tipo de comprobante',
      options: options,
      disabled: isDisabled,
      required: true,
      sm: 7,
      space: 7,
    },
  ]
}

export const ITEMS_PROCESS_TRANSFER = ({
  isDisabled,
  name = 'idOfficeExec',
  isRequired = true,
  label = 'Dependencia destino del traslado de expedientes',
  toggleDisabled = () => {},
}) => {
  return [
    {
      label,
      name,
      required: isRequired,
      type: 'autocompleteRequest',
      queryRequest: { querySearch: 'querySearch', additionalQuery: '&isActive=true' },
      disabled: isDisabled,
      requestprops: {
        isCompanyRequest: true,
        baseKey: 'urlUsers',
        url: `/hierarchy`,
        requestOnInput: true,
      },

      vlprops: {
        usePagination: true,
        hasQuerySearch: true,
        shouldClose: true,
        toggleDisabled,
        columns: [
          {
            dataIndex: 'nombre',
            title: 'Dependencia',
            render: (_, row) => `${row?.name ?? ''}`,
          },
        ],
      },
      autocompleteprops: {
        getOptionLabel: (option) => `${option?.name ?? ''}`,
      },
      validate: false,
      className: 'col-span-12 xs:col-span-12 sm:col-span-12',
    },
  ]
}
