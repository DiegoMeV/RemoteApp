import { CustomOptionUserSigedoc, HeaderOptionsUserSigedoc, MagicString } from '@/lib'
import { Box } from '@mui/material'

export const type_identifications = [
  { value: 'CC', label: 'Cédula de ciudadanía' },
  { value: 'CE', label: 'Cédula de extranjería' },
  { value: 'NIT', label: 'NIT' },
  { value: 'NUIP', label: 'NUIP' },
  { value: 'Pasaporte', label: 'Pasaporte' },
  { value: 'Registro civil', label: 'Registro civil' },
]

const commonFields = ({ disabled, infoDocumentTypeRequest }) => {
  return [
    {
      name: 'subject',
      label: 'Asunto',
      type: 'text',
      required: true,
      disabled: disabled,
    },
    {
      name: 'documentTypeRequest',
      type: 'autocomplete',
      required: true,
      autocompleteProps: {
        options: infoDocumentTypeRequest?.data?.data ?? [],
        loadingOptions: infoDocumentTypeRequest?.loading,
        disabled: disabled,
      },
      textFieldProps: {
        label: 'Tipo de documento',
      },
    },
  ]
}

const SIGEDOCFORM = {
  IE: ({
    infoUser,
    infoDestinityOffice,
    infoSeries,
    infoTypology,
    infoDocumentTypeRequest,
    disabled,
  }) => {
    const fields = commonFields({ disabled, infoDocumentTypeRequest })

    return [
      {
        name: 'destinyOffice',
        type: 'autocomplete',
        required: true,
        autocompleteProps: {
          options: infoDestinityOffice?.data?.data ?? [],
          loadingOptions: infoDestinityOffice?.loading,
          openModal: infoDestinityOffice?.openModal?.handleShow,
          disabled: disabled,
        },
        textFieldProps: {
          label: 'Dependencia destino',
          onChange: (e) => infoDestinityOffice?.searchOptions?.handleSearchText(e.target.value),
        },
      },
      {
        name: 'userDestiny',
        type: 'autocomplete',
        required: true,
        autocompleteProps: {
          options: infoUser?.data ?? [],
          loadingOptions: infoUser?.loading,
          openModal: infoUser?.openModal?.handleShow,
          getOptionLabel: (option) => `${option?.firstName ?? ''} ${option?.lastName ?? ''}`,
          isOptionEqualToValue: (option, value) =>
            `${option?.id ?? ''}${option?.jobTitle?.id ?? ''}` ===
            `${value?.id ?? ''}${value?.jobTitle?.id ?? ''}`,
          groupBy: () => 'All Options',
          renderGroup: (params) => (
            <Box key='header-options'>
              <HeaderOptionsUserSigedoc params={params} />
            </Box>
          ),
          renderOption: (props, option) => {
            const { key, ...rest } = props
            return (
              <Box
                key={`${option.id ?? ''}${option?.jobTitle?.id ?? ''}`}
                {...rest}
              >
                <CustomOptionUserSigedoc
                  key={key}
                  option={option}
                />
              </Box>
            )
          },
          disabled: disabled,
        },
        textFieldProps: {
          label: 'Usuario destino',
          onChange: (e) => infoUser?.searchUser?.handleSearchText(e.target.value),
        },
      },
      ...fields,
      {
        name: 'serie',
        type: 'autocomplete',
        required: true,
        autocompleteProps: {
          options: infoSeries?.data?.data ?? [],
          loadingOptions: infoSeries?.loading,
          openModal: infoSeries?.openModal?.handleShow,
          disabled: disabled,
        },
        textFieldProps: {
          label: 'Serie',
        },
      },
      {
        name: 'typology',
        type: 'autocomplete',
        required: true,
        autocompleteProps: {
          options: infoTypology?.data?.data ?? [],
          loadingOptions: infoTypology?.loading,
          disabled: disabled,
        },
        textFieldProps: {
          label: 'Tipología',
        },
      },
    ]
  },
  EE: ({ infoSeries, infoTypology, infoDocumentTypeRequest, disabled, handleBlurTercero }) => {
    // EE no tiene user destiny ni dependencia destino
    // bloquearles las commonFields a este tipo de comunicación
    const fields = commonFields({ disabled, infoDocumentTypeRequest })
    return [
      ...fields,
      //USUARIO ORIGEN Y DEPENDENCIA ORIGEN
      //no requieren los inputs, porque siempre se sabe cual es el usuario origen y la dependencia origen
      {
        type: 'select',
        options: type_identifications,
        name: 'tercero.tipoIdentificacion',
        label: 'Tipo de Identificación tercero destino',
        required: true,
        disabled: disabled,
        onBlur: handleBlurTercero,
      },
      {
        name: 'tercero.identificacion',
        label: 'Identificación tercero destino',
        required: true,
        disabled: disabled,
        onBlur: handleBlurTercero,
      },
      {
        name: 'tercero.nombre',
        label: 'Nombre tercero destino',
        required: true,
        disabled: disabled,
      },
      {
        name: 'tercero.apellido',
        label: 'Apellidos tercero destino',
        required: true,
        disabled: disabled,
      },
      {
        type: 'email',
        name: 'tercero.correo',
        label: 'Correo tercero destino',
        required: true,
        disabled: disabled,
      },
      {
        name: 'serie',
        type: 'autocomplete',
        required: true,
        autocompleteProps: {
          options: infoSeries?.data?.data ?? [],
          loadingOptions: infoSeries?.loading,
          openModal: infoSeries?.openModal?.handleShow,
          disabled: disabled,
        },
        textFieldProps: {
          label: 'Serie',
        },
      },
      {
        name: 'typology',
        type: 'autocomplete',
        required: true,
        autocompleteProps: {
          options: infoTypology?.data?.data ?? [],
          loadingOptions: infoTypology?.loading,
          disabled: disabled,
        },
        textFieldProps: {
          label: 'Tipología',
        },
      },
    ]
  },
  ER: ({ infoDocumentTypeRequest, infoSeries, disabled, handleBlurTercero }) => {
    const fields = commonFields({ disabled, infoDocumentTypeRequest })

    return [
      ...fields,
      {
        name: 'serie',
        type: 'autocomplete',
        required: true,
        autocompleteProps: {
          options: infoSeries?.data?.data ?? [],
          loadingOptions: infoSeries?.loading,
          disabled: disabled,
        },
        textFieldProps: {
          label: 'Serie',
        },
      },
      {
        type: 'select',
        options: type_identifications,
        name: 'tercero.tipoIdentificacion',
        label: 'Tipo de Identificación tercero destino',
        required: true,
        disabled: disabled,
        onBlur: handleBlurTercero,
      },
      {
        name: 'tercero.identificacion',
        label: 'Identificación tercero destino',
        required: true,
        disabled: disabled,
        onBlur: handleBlurTercero,
      },
      {
        name: 'tercero.nombre',
        label: 'Nombre tercero destino',
        required: true,
        disabled: disabled,
      },
      {
        name: 'tercero.apellido',
        label: 'Apellidos tercero destino',
        required: true,
        disabled: disabled,
      },
      {
        type: 'email',
        name: 'tercero.correo',
        label: 'Correo tercero destino',
        required: true,
        disabled: disabled,
      },
    ]
  },
}

export const getFormByType = ({ type, ...props }) => SIGEDOCFORM?.[type]?.(props)

export const inputLabelSearchSigedoc = ({
  index,
  handleClick,
  isLoading,
  idSigedoc,
  verificationSuccess,
}) => ({
  isLoading,
  required: true,
  readOnly: verificationSuccess,
  name: `arrSearch.${index}.label`,
  label: MagicString.MANAGEMENT.SIGEDOC_SEARCH_INPUT_LABEL,
  onClickSearchBtn: handleClick,
  disabledBtn: verificationSuccess,
  success: verificationSuccess,
  error: {
    status: idSigedoc === 'none',
    message: MagicString.MANAGEMENT.SIGEDOC_FAILED_SEARCH,
  },
})

export const inputForFolderCreation = (disabled) => {
  return [
    {
      name: 'nombre',
      label: 'Nombre del expediente',
      required: true,
      disabled: disabled,
    },
    {
      name: 'serie.codigo',
      label: 'Serie',
      required: true,
      InputProps: {
        readOnly: true,
      },
      disabled: disabled,
    },
    {
      type: 'date',
      name: 'fechaInicial',
      label: 'Fecha inicial',
      required: true,
      disabled: disabled,
    },
  ]
}

export const inputFolder = ({ folders, loadingFolders, disabled }) => {
  return [
    {
      sm: 12,
      space: 12,
      name: 'folder',
      type: 'autocomplete',
      required: true,
      autocompleteProps: {
        options: folders?.data?.Carpetas ?? [],
        loadingOptions: loadingFolders,
        disabled: disabled,
      },
      textFieldProps: {
        label: 'Expediente',
      },
    },
  ]
}
