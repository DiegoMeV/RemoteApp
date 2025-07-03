import { calculateAge } from '@/lib/funcs'
import dayjs from 'dayjs'
import { noRequiredIdentification } from './actorEditingModal'

export const complainantOrAccusedColumns = (onlyRead) => {
  const columns = [
    {
      field: 'quality',
      headerName: 'Calidad',
      width: 150,
      valueGetter: (params) => {
        return `${
          params?.row?.calidad
            ? tableEquivalenceValues.quality[params.row.calidad]
            : params?.row?.quality
            ? tableEquivalenceValues.quality[params.row.quality]
            : ''
        }`
      },
    },
    {
      field: 'documentType',
      headerName: 'Tipo de Documento',
      width: 150,
      valueGetter: (params) =>
        `${
          params.row.documentType
            ? tableEquivalenceValues?.documentType?.[params?.row?.documentType]
            : params?.row?.document_type
            ? tableEquivalenceValues?.documentType?.[params?.row?.document_type]
            : ''
        }`,
    },
    {
      field: 'documentNumber',
      headerName: 'Nro. Identificación',
      width: 150,
      valueGetter: (params) =>
        `${params?.row?.documentNumber ?? params?.row?.identification ?? ''}`,
    },
    { field: 'firstName', headerName: 'Nombres', width: 150 },
    {
      field: 'lastName',
      headerName: 'Primer Apellido',
      width: 150,
      valueGetter: (params) => `${params?.row?.lastName ?? params?.row?.lastNameOne ?? ''}{' '}`,
    },
    { field: 'lastNameTwo', headerName: 'Segundo Apellido', width: 150 },
    { field: 'address', headerName: 'Dirección Residencia', width: 150 },
  ]
  if (!onlyRead) {
    columns.push(
      { field: 'phone', headerName: 'Teléfono y/o Celular', width: 150 },
      { field: 'email', headerName: 'Email', width: 150 }
    )
  }

  return columns
}

export const complainantOrAccusedForm = (
  handleChangeDocumentType,
  validationsV2,
  onBlurIdentification,
  typeTable,
  handleChangeIdentification
) => {
  const documnetType = validationsV2?.[0]
  const requiredLastNameOne = documnetType !== 'desconocido'
  const requiredID = noRequiredIdentification?.includes(documnetType)

  const isAccused = typeTable === 'DENUNCIADO'

  const isPetioner = typeTable === 'PETICIONARIO'

  const optionsQuality = isPetioner
    ? [{ value: 'peticionario', label: 'Peticionario' }]
    : isAccused
    ? [
        {
          value: 'denunciado',
          label: 'Denunciado',
        },
        {
          value: 'deudor',
          label: 'Deudor',
        },
      ]
    : [
        { value: 'denunciante', label: 'Denunciante' },
        { value: 'victima', label: 'Victima' },
        { value: 'representante', label: 'Representante Legal' },
        { value: 'solicitante', label: 'Solicitante' },
        { value: 'denunciante_victima', label: 'Denunciante Victima' },
        { value: 'acreedor_alimentos', label: 'Acreedor de Alimentos' },
      ]

  return [
    {
      name: 'quality',
      label: 'Calidad',
      type: 'select',
      required: true,
      options: optionsQuality,
      defaultValue: isPetioner ? 'peticionario' : isAccused ? 'denunciado' : null,
    },
    {
      name: 'documentType',
      label: 'Tipo Documento',
      type: 'select',
      required: true,
      options: [
        { value: 'desconocido', label: 'Desconocido' },
        { value: 'CC', label: 'Cédula de Ciudadanía' },
        { value: 'TI', label: 'Tarjeta de Identidad' },
        { value: 'menor_sin_identificacion', label: 'Menor sin Identificación' },
        { value: 'CE', label: 'Cédula de Extranjería' },
        { value: 'extranjero_indocumentado', label: 'Extranjero Indocumentado' },
        { value: 'RC', label: 'Registro Civil' },
        { value: 'certificado_nacido_vivo', label: 'Certificado Nacido Vivo' },
        { value: 'adulto_sin_identificacion', label: 'Adulto sin Identificación' },
        { value: 'PA', label: 'Pasaporte' },
        { value: 'PEP', label: 'Permiso de Ingreso y Permanencia' },
        { value: 'PPT', label: 'Permiso de Protección Temporal' },
      ],
      onChange: handleChangeDocumentType ?? null,
    },
    {
      name: 'documentNumber',
      label: 'Nro. Identificación',
      placeholder: 'Nro. Identificación',
      required: !requiredID,
      onBlur: onBlurIdentification,
      onChange: handleChangeIdentification,
    },
    {
      name: 'firstName',
      label: 'Nombres',
      placeholder: 'Nombres',
      required: true,
    },
    {
      name: 'lastName',
      label: 'Primer Apellido',
      placeholder: 'Primer Apellido',
      required: requiredLastNameOne,
    },
    {
      name: 'lastNameTwo',
      label: 'Segundo Apellido',
      placeholder: 'Segundo Apellido',
    },
    {
      name: 'address',
      label: 'Dirección Residencia',
      placeholder: 'Dirección Residencia',
    },
    {
      name: 'phone',
      label: 'Teléfono y/o Celular',
      placeholder: 'Teléfono y/o Celular',
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
    },
  ]
}

export const tableEquivalenceValues = {
  // CAMBIAR SOLO ESTE: quality
  quality: {
    denunciante: 'Denunciante',
    victima: 'Victima',
    representante: 'Representante Legal',
    solicitante: 'Solicitante',
    denunciante_victima: 'Denunciante Victima',
    denunciado: 'Denunciado',
    deudor: 'Deudor',
    acreedor_alimentos: 'Acreedor de Alimentos',
  },

  documentType: {
    desconocido: 'Desconocido',
    CC: 'Cédula de Ciudadanía',
    TI: 'Tarjeta de Identidad',
    menor_sin_identificacion: 'Menor sin Identificación',
    CE: 'Cédula de Extranjería',
    extranjero_indocumentado: 'Extranjero Indocumentado',
    RC: 'Registro Civil',
    certificado_nacido_vivo: 'Certificado Nacido Vivo',
    adulto_sin_identificacion: 'Adulto sin Identificación',
    PA: 'Pasaporte',
    PEP: 'Permiso de Ingreso y Permanencia',
    PPT: 'Permiso de Protección Temporal',
  },
}

export const additionalDataToComplainantOrAccusedForm = ({
  handleChangeDateBirth,
  handleChangeDisabilityStatus,
  validationsV2,
  educationalLevel,
  formModal,
  lovEducationLevel = {},
  lovNeighborhoods = {},
  lovDepartments = {},
}) => {
  const genre = formModal?.watch('genero')
  const disabledMujerGestante = genre === 'masculino'
  const documentTypesMinors = ['TI', 'menor_sin_identificacion', 'RC', 'certificado_nacido_vivo']
  const { modalNeighborhoods, neighborhoodsInfo, handleChangeNeighborhood, searchNeighborhoods } =
    lovNeighborhoods

  const { modalProvinces, provincesInfo, handleChangeBornProvince, searchDepartments } =
    lovDepartments

  const { valueListEducationLevel, handleChangeEducationalLevel, searchEducationLevel } =
    lovEducationLevel
  const [documentType, fecha_nacimiento, persona_condicion_discapacidad] = validationsV2 ?? []

  const isCC = documentType === 'CC'
  const minorDateValidation = documentTypesMinors.includes(documentType)
  const defaultAge = fecha_nacimiento ? calculateAge(fecha_nacimiento) : null

  const isAMinor = defaultAge < 18
  const enabledSexualOrientation = defaultAge < 14

  let noSelectData = new Date()
  noSelectData.setFullYear(noSelectData.getFullYear() - 18)

  const communeValue = formModal?.watch?.('comuna_corregimiento')

  return [
    {
      name: 'fecha_nacimiento',
      label: 'Fecha de Nacimiento',
      datePickerProps: {
        minDate: minorDateValidation ? dayjs(noSelectData) : null,
        maxDate: isCC ? dayjs(noSelectData) : null,
        onChange: handleChangeDateBirth,
        disableFuture: true,
      },
      type: 'date',
      required: true,
      validate: {
        custom: (value) => {
          if (value > new Date()) {
            return 'Fecha incorrecta'
          } else if (minorDateValidation && value < noSelectData) {
            return 'Fecha incorrecta'
          } else if (isCC && value > noSelectData) {
            return 'Fecha incorrecta'
          }
          return true
        },
      },
    },
    {
      name: 'edad',
      label: 'Edad',
      type: 'number',
      value: defaultAge,
      InputProps: { readOnly: true },
      helperText: 'Edad calculada a partir de la fecha de nacimiento',
    },
    {
      name: 'genero',
      label: 'Sexo al nacer',
      required: true,
      type: 'select',
      options: [
        { value: 'femenino', label: 'FEMENINO' },
        { value: 'no_identidad', label: 'NO IDENTIDAD' },
        { value: 'masculino', label: 'MASCULINO' },
      ],
      noDefaultValue: true,
    },
    {
      name: 'orientacion_sexual_lgtbi',
      label: 'Orientaciòn Sexual / Comunidad LGTBI',
      type: 'select',
      options: [
        { value: 'heterosexual', label: 'HETEROSEXUAL' },
        { value: 'cisgenerista', label: 'CISGENERÍSTA' },
        { value: 'homosexual', label: 'HOMOSEXUAL' },
        { value: 'bisexual', label: 'BISEXUAL' },
      ],
      required: !enabledSexualOrientation,
      disabled: enabledSexualOrientation,
      noDefaultValue: true,
      helperText: enabledSexualOrientation ? 'No aplica para menores de 14 años' : '',
    },
    {
      name: 'puntaje_sisben',
      label: 'Puntaje / Sisben',
    },
    {
      name: 'tipo_seguridad_social',
      label: 'Tipo de Seguridad en Salud',
      required: true,
      type: 'select',
      options: [
        { value: 'contributivo', label: 'REGIMEN CONTRIBUTIVO' },
        { value: 'subsidiado', label: 'REGIMEN SUBSIDIADO' },
        { value: 'poblacion_vinculada', label: 'POBLACION VINCULADA' },
      ],
      noDefaultValue: true,
    },
    {
      name: 'tipo_violencia',
      label: 'Tipo de Violencia',
      type: 'select',
      inputProps: { multiple: true },
      options: [
        { value: 'economica', label: 'ECONÓMICA' },
        { value: 'fisica', label: 'FÍSICA' },
        { value: 'patrimonial', label: 'PATRIMONIAL' },
        { value: 'psicologica', label: 'PSICOLÓGICA' },
        { value: 'sexual', label: 'SEXUAL' },
        { value: 'verbal', label: 'VERBAL' },
        { value: 'violencia_genero', label: 'VIOLENCIA DE GENERO' },
        { value: 'violencia_vicaria', label: 'VIOLENCIA VICARIA' },
        { value: 'no_aplica', label: 'NO APLICA' },
      ],
      space: 12,
    },
    {
      name: 'cabeza_familia',
      label: 'Cabeza de Familia',
      type: 'checkbox',
      disabled: isAMinor,
      defaultValue: false,
    },
    {
      name: 'experiencia_migratoria',
      label: 'Experiencia Migratoria Dentro Del Nucleo Familiar',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'mujer_gestante_lactante',
      label: 'Mujer Gestante / Lactante',
      type: 'select',
      disabled: disabledMujerGestante,
      options: [
        { value: 'Si', label: 'SI' },
        { value: 'No', label: 'NO' },
      ],
    },
    {
      name: 'lider_representante_comunidad_organizacion',
      label: 'Lider / Representante Comunidad / Organización',
      type: 'select',
      options: [
        { value: 'Si', label: 'SI' },
        { value: 'No', label: 'NO' },
      ],
    },
    {
      name: 'persona_condicion_discapacidad',
      label: 'Persona en Condición de Discapacidad',
      type: 'checkbox',
      defaultValue: false,
      onChange: handleChangeDisabilityStatus,
    },
    {
      name: 'categoria_discapacidad',
      label: 'Categoría de Discapacidad',
      type: 'select',
      options: [
        { value: 'auditiva', label: 'AUDITIVA' },
        { value: 'fisica', label: 'FISICA' },
        { value: 'intelectual', label: 'INTELECTUAL' },
        { value: 'multiple', label: 'MULTIPLE' },
        { value: 'psicosocial', label: 'PSICOSOCIAL' },
        { value: 'sordoceguera', label: 'SORDOCEGUERA' },
        { value: 'visual', label: 'VISUAL' },
      ],
      noDefaultValue: true,
      disabled: !persona_condicion_discapacidad,
      required: persona_condicion_discapacidad,
    },
    {
      name: 'grupo_etnico',
      label: 'Grupo Étnico',
      required: true,
      type: 'select',
      options: [
        { value: 'indigena', label: 'INDÍGENA' },
        { value: 'rom', label: 'ROM' },
        { value: 'raizal', label: 'RAIZAL' },
        { value: 'palenquero', label: 'PALENQUERA DE SAN BASILO' },
        { value: 'varios', label: 'NEGRO(A), MULATO(A), AFROCOLOMBIANO(A) O AFRODESCENDIENTRE' },
        { value: 'mestizo', label: 'MESTIZO' },
        { value: 'ninguno', label: 'NINGUNO DE LOS ANTERIORES' },
      ],
      noDefaultValue: true,
    },
    {
      name: 'nivel_educativo',
      autocompleteProps: {
        options: educationalLevel?.data?.data ?? [],
        onChange: (_, newValue) => {
          handleChangeEducationalLevel(newValue)
        },
        loadingOptions: educationalLevel?.isLoading ?? false,
        openModal: valueListEducationLevel?.handleShow,
      },
      textFieldProps: {
        label: 'Nivel Educativo que Tiene o Cursa',
        onChange: (e) => {
          searchEducationLevel.handleSearchText(e.target.value)
        },
      },
      type: 'autocomplete',
    },
    {
      name: 'condicion_laboral',
      label: 'Condición Ocupacional',
      type: 'select',
      options: [
        { value: 'ama_de_casa', label: 'AMA DE CASA' },
        { value: 'buscando_empleo', label: 'BUSCANDO EMPLEO' },
        { value: 'desempleado', label: 'DESEMPLEADO' },
        { value: 'empleado', label: 'EMPLEADO' },
        { value: 'estudiante', label: 'ESTUDIANTE' },
        { value: 'independiente', label: 'INDEPENDIENTE' },
        { value: 'pensionado', label: 'PENSIONADO' },
        { value: 'ninguno', label: 'NINGUNO' },
      ],
      noDefaultValue: true,
    },
    {
      name: 'barrio_vereda',
      required: true,
      type: 'autocomplete',
      autocompleteProps: {
        options: neighborhoodsInfo?.data?.data ?? [],
        onChange: (_, newValue) => {
          handleChangeNeighborhood(newValue)
        },
        loadingOptions: neighborhoodsInfo?.isLoading ?? false,
        openModal: modalNeighborhoods?.handleShow,
      },
      textFieldProps: {
        label: 'Barrio o Vereda de Residencia',
        onChange: (event) => searchNeighborhoods?.handleSearchText(event.target.value),
      },
    },
    {
      name: 'comuna_corregimiento',
      label: 'Comuna / Corregimiento',
      InputProps: { readOnly: true },
      value: communeValue?.name ?? '',
    },
    {
      name: 'zona_residencial',
      label: 'Zona de Residencia',
      InputProps: { readOnly: true },
      type: 'select',
      options: [
        { value: 1, label: 'URBANO' },
        { value: 2, label: 'RURAL' },
      ],
    },
    {
      name: 'departamento_procedencia',
      type: 'autocomplete',
      autocompleteProps: {
        options: provincesInfo?.data?.data ?? [],
        onChange: (_, newValue) => {
          handleChangeBornProvince(newValue)
        },
        loadingOptions: provincesInfo?.isLoading ?? false,
        openModal: modalProvinces?.handleShow,
      },
      textFieldProps: {
        label: 'Departamento de Procedencia',
        onChange: (e) => searchDepartments?.handleSearchText(e.target.value),
      },
    },
  ]
}

export const allDataComplainantOrAccused = [
  ...complainantOrAccusedForm(),
  ...additionalDataToComplainantOrAccusedForm({}),
]

export const stepsFamilyServices = [
  'Selección de proceso',
  'Datos básicos',
  'Denunciantes',
  'Denunciados',
  'Gestión del funcionario',
  'Resumen',
]

export const enabledCharacterizacion = [
  'desconocido',
  null,
  undefined,
  'menor_sin_identificacion',
  'adulto_sin_identificacion',
]

export const inputsStepFiveFamilyServices = [
  'incidentReporting',
  'incidentDate',
  'assignLawyer',
  'requestType',
  'observation',
]

export const inputsStepFiveOnly = ['assignLawyer', 'requestType', 'observation']

export const inputsStepOneTwoFamilyServices = ['incidentReporting', 'incidentDate']

export const taskToBeNotified = {
  legalConsultation: 'Notificaci para selecci de tipo de registro',
  remisiones: 'Cargue Registro Toma de Denuncia Remisiones',
}

export * from './actorEditingModal'
