import { MappingOptions } from '@/lib'
import { Add, Edit, LibraryAdd, PlaylistAdd } from '@mui/icons-material'
import { GRID_DETAIL_PANEL_TOGGLE_COL_DEF } from '@mui/x-data-grid-premium'
import { CustomExpand } from '../components'

const retencionesOptions = ({ openModal }) => {
  return [
    {
      title: 'Crear serie',
      icon: <Add />,
      onClick: openModal,
      privilege: 'documentos.retenciones.crear_serie',
    },
  ]
}

const seriesAndSubseriesOptions = ({ openModal, params, serie, containsSubserie }) => {
  const haveSubserie = containsSubserie(params)
  if (serie) {
    return [
      ...(haveSubserie
        ? [
            {
              title: 'Crear sub serie',
              icon: <PlaylistAdd />,
              onClick: () =>
                openModal({ ...params.row, type: 'subserie', form: 'addSubSerie', isNew: true }),
              privilege: 'documentos.retenciones.crear_subserie',
            },
          ]
        : []),
      ...(!haveSubserie
        ? [
            {
              title: 'Crear tipo documental',
              icon: <LibraryAdd />,
              onClick: () =>
                openModal({
                  ...params.row,
                  type: 'documentType',
                  form: 'createDocumentType',
                  isNew: true,
                }),
              privilege: 'documentos.retenciones.crear_tipo_documental',
            },
          ]
        : []),
      {
        title: 'Editar serie',
        icon: <Edit />,
        onClick: () =>
          openModal({ ...params.row, type: 'serie', form: 'editSerie', editing: true }),
        privilege: 'documentos.retenciones.editar_serie',
      },
    ]
  }
  return [
    {
      title: 'Crear tipo documental',
      icon: <LibraryAdd />,
      onClick: () =>
        openModal({ ...params.row, type: 'documentType', form: 'createDocumentType', isNew: true }),
      privilege: 'documentos.retenciones.crear_tipo_documental',
    },
    {
      title: 'Editar sub serie',
      icon: <Edit />,
      onClick: () =>
        openModal({ ...params.row, type: 'subserie', form: 'editSubSerie', editing: true }),
      privilege: 'documentos.retenciones.editar_subserie',
    },
  ]
}

export const retencionColumns = ({ openModal }) => {
  return [
    {
      ...GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
      renderCell: (params) => (
        <CustomExpand
          id={params.id}
          value={params.value}
        />
      ),
    },
    {
      field: 'identification',
      headerName: 'Código de dependencia',
      minWidth: 250,
    },
    {
      field: 'name',
      headerName: 'Nombre de dependencia',
      minWidth: 250,
    },
    {
      field: 'options',
      headerName: '',
      maxWidth: 120,
      renderCell: (params) => {
        const options = retencionesOptions({
          openModal: () => {
            openModal({ ...params.row, type: 'serie', form: 'addSerie', isNew: true })
          },
        })
        return <MappingOptions options={options} />
      },
    },
  ]
}

export const columnsDocumentType = ({ openModal }) => {
  return [
    {
      field: 'numero',
      headerName: 'Código',
      minWidth: 100,
    },
    {
      field: 'nombre',
      headerName: 'Nombre del tipo documental',
      minWidth: 250,
    },
    {
      field: 'options',
      headerName: '',
      maxWidth: 120,
      renderCell: (params) => {
        return (
          <MappingOptions
            options={[
              {
                title: 'Editar tipo documental',
                icon: <Edit />,
                onClick: () =>
                  openModal({
                    ...params.row,
                    type: 'documentType',
                    form: 'editDocumentType',
                    editing: true,
                  }),
                privilege: 'documentos.retenciones.editar_tipo_documental',
              },
            ]}
          />
        )
      },
    },
  ]
}

export const seriesAndSubseriesColumns = ({ openModal, serie }) => {
  return [
    {
      ...GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
      renderCell: (params) => (
        <CustomExpand
          id={params.id}
          value={params.value}
        />
      ),
    },
    {
      field: 'numero',
      headerName: serie ? 'Código de la serie' : 'Código de la subserie',
      minWidth: serie ? 200 : 150,
    },
    {
      field: 'nombre',
      headerName: serie ? 'Nombre de la serie' : 'Nombre de la subserie',
      minWidth: 400,
      valueGetter: (params) => ` ${serie ? 'Serie: ' : 'Subserie: '} ${params.value}`,
    },
    {
      field: 'options',
      headerName: '',
      width: 120,
      renderCell: (params) => {
        const containsSubserie = (params) => {
          return params?.row?.especificaciones?.retGestion ||
            params?.row?.especificaciones?.retArchivoCentral ||
            params?.row?.consecutivoInicial ||
            params?.row?.especificaciones?.procedimiento
            ? false
            : true
        }
        const options = seriesAndSubseriesOptions({
          openModal,
          params,
          serie,
          containsSubserie,
        })
        return <MappingOptions options={options} />
      },
    },
  ]
}

export const formsForRetenciones = (editing) => {
  return {
    serie: [
      {
        label: 'Número',
        name: 'numero',
        className: 'col-span-4',
        required: true,
        disabled: editing ?? false,
      },
      { label: 'Nombre', name: 'nombre', className: 'col-span-8', required: true },
    ],
    aditionalDataSerie: [
      {
        label: 'Retención archivo gestión',
        name: 'especificaciones.retGestion',
        className: 'general_form_item md:col-span-4',
      },
      {
        label: 'Retención archivo central',
        name: 'especificaciones.retArchivoCentral',
        className: 'general_form_item md:col-span-4',
      },
      {
        label: 'Disposición final',
        name: 'especificaciones.disposicionFinal',
        className: 'general_form_item md:col-span-4',
        type: 'select',
        inputProps: {
          multiple: true,
        },
        noDefaultValue: true,
        validate: (value) => {
          if (value?.length > 2) {
            return 'No puede seleccionar más de dos opciones'
          }
          return true
        },
        options: [
          {
            label: 'Conservación total',
            value: 'CT',
          },
          {
            label: 'Selección',
            value: 'S',
          },
          {
            label: 'Eliminación',
            value: 'E',
          },
        ],
      },
      {
        label: 'Reproducción Técnica del Papel',
        name: 'especificaciones.tecnicaDelPapel',
        className: 'general_form_item md:col-span-4',
        type: 'select',
        noDefaultValue: true,
        options: [
          {
            label: 'Microfilmación',
            value: 'M',
          },
          {
            label: 'Digitalización',
            value: 'D',
          },
        ],
      },
      {
        label: 'Consecutivo inicial',
        name: 'consecutivoInicial',
        className: 'general_form_item md:col-span-4',
        type: 'number',
      },
      {
        label: 'Estado',
        name: 'isEnabled',
        type: 'switch',
        className: 'general_form_item md:col-span-4',
      },
      {
        label: 'Procedimiento',
        name: 'especificaciones.procedimiento',
        type: 'multiline',
        multiline: true,
        minRows: 4,
        className: 'col-span-12',
      },
    ],
    subserie: [
      {
        label: 'Número',
        name: 'numero',
        className: 'general_form_item',
        required: true,
        disabled: editing ?? false,
      },
      { label: 'Nombre', name: 'nombre', space: 6, required: true, className: 'general_form_item' },

      {
        label: 'Retención archivo gestión',
        name: 'especificaciones.retGestion',
        space: 3,
        className: 'general_form_item md:col-span-4',
      },
      {
        label: 'Retención archivo central',
        name: 'especificaciones.retArchivoCentral',
        space: 3,
        className: 'general_form_item md:col-span-4',
      },
      {
        label: 'Disposición final',
        name: 'especificaciones.disposicionFinal',
        className: 'general_form_item md:col-span-4',
        type: 'select',
        inputProps: {
          multiple: true,
        },
        noDefaultValue: true,
        validate: (value) => {
          if (value?.length > 2) {
            return 'No puede seleccionar más de dos opciones'
          }
          return true
        },
        options: [
          {
            label: 'Conservación total',
            value: 'CT',
          },
          {
            label: 'Selección',
            value: 'S',
          },
          {
            label: 'Eliminación',
            value: 'E',
          },
        ],
      },
      {
        label: 'Reproducción Técnica del Papel',
        name: 'especificaciones.tecnicaDelPapel',
        className: 'general_form_item md:col-span-4',
        type: 'select',
        noDefaultValue: true,
        options: [
          {
            label: 'Microfilmación',
            value: 'M',
          },
          {
            label: 'Digitalización',
            value: 'D',
          },
        ],
      },
      {
        label: 'Consecutivo inicial',
        name: 'consecutivoInicial',
        space: 3,
        type: 'number',
        className: 'general_form_item md:col-span-4',
      },
      {
        label: 'Estado',
        name: 'isEnabled',
        space: 3,
        type: 'switch',
        className: 'general_form_item md:col-span-4',
      },
      {
        label: 'Procedimiento',
        name: 'especificaciones.procedimiento',
        type: 'multiline',
        className: 'col-span-12',
        multiline: true,
        minRows: 4,
        space: 12,
      },
    ],
    documentType: [
      { label: 'Nombre del tipo documental', name: 'nombre', className: 'col-span-12' },
    ],
  }
}
