import {
  ClassicIconButton,
  GenericSelect,
  GenericTextfield,
  formatColombianMoney,
  formatDateToCustomString,
} from '@/lib'
import { Edit, ErrorOutline, PostAddOutlined, Save, Visibility } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

export const tableColumns = (
  navigate,
  handleOpenModal,
  hasEditPrivilege,
  hasCompromisedRevisionPriv,
  hasRevisionPriv,
  hasGeneratePriv,
  informativeModal,
  setIdRow,
  handleGenerateActa
) => {
  const columns = [
    {
      field: 'numero_contrato',
      headerName: 'Numero contrato',
      minWidth: 150,
      valueGetter: (params) => `${params?.row?.numero_contrato ?? ''}`,
    },
    {
      field: 'tipo_reunion',
      headerName: 'Tipo reunion',
      minWidth: 150,
      valueGetter: (params) => {
        return `${params?.row?.nombre_tipo_reunion ?? ''}`
      },
    },
    {
      field: 'numero_mesa',
      headerName: 'Numero mesa',
      minWidth: 200,
      valueGetter: (params) => `${params?.row?.identificador ?? ''}`,
    },
    {
      field: 'sigedoc_inclusion',
      headerName: 'Sigedoc inclusíon',
      width: 200,
      valueGetter: (params) => {
        return `${params?.row?.registroAriData?.sigedoc_inclusion ?? ''}`
      },
    },
    {
      field: 'caso_individual_cat',
      headerName: 'Caso individual (CAT)',
      minWidth: 150,
      valueGetter: (params) => {
        return `${params?.row?.registroAriData?.caso_individual_cat ?? ''}`
      },
    },
    {
      field: 'estado',
      headerName: 'Ultima revisión',
      minWidth: 150,
    },
  ]

  if (hasEditPrivilege || hasCompromisedRevisionPriv || hasRevisionPriv) {
    columns.push({
      field: 'options',
      headerName: '',
      width: 170,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      cellClassName: 'actions',
      headerAlign: 'center',
      renderCell: (params) => {
        const isTotallyApproved = params.row?.estado === 'APROBADO TOTAL'
        return (
          <Box>
            {hasEditPrivilege && (
              <IconButton title='Editar mesa'>
                <Edit onClick={() => navigate(`/applications/uri/tables/${params.row?.id}`)} />
              </IconButton>
            )}
            {hasCompromisedRevisionPriv && (
              <ClassicIconButton
                title='Revisión de compromisos'
                onClick={() => handleOpenModal(params.row)}
              >
                <Visibility />
              </ClassicIconButton>
            )}
            {hasRevisionPriv && (
              <ClassicIconButton
                title='Revisión de mesa'
                color='secondary'
                onClick={() => {
                  informativeModal.handleShow()
                  setIdRow(params.row.id)
                }}
              >
                <ErrorOutline />
              </ClassicIconButton>
            )}
            {isTotallyApproved && hasGeneratePriv && (
              <ClassicIconButton
                title='Generar acta'
                onClick={() => handleGenerateActa(params?.row?.id)}
              >
                <PostAddOutlined />
              </ClassicIconButton>
            )}
          </Box>
        )
      },
      hideable: false,
      filterable: false,
    })
  }

  return columns
}

const reviewValue = {
  APROBADO: 'Aprobado',
  RECHAZADO: 'Rechazado',
}

export const comminmentsColumns = (form, onSave, userData) => {
  const validation = (reviews) => {
    const searchReview = reviews?.find((review) => review?.dataUserAudita?.id === userData?.id)
    return searchReview ? true : false
  }
  const columns = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      minWidth: 250,
      valueGetter: (params) => {
        return `${params?.row?.descripcion ?? ''}`
      },
    },
    {
      field: 'revision',
      headerName: 'Revisión',
      width: 200,
      renderCell: (params) => {
        const reviews = params?.row?.dataRevisiones
        const readOnly = validation(reviews)
        const searchReview = reviews?.find((review) => review?.dataUserAudita?.id === userData?.id)
        const label = reviewValue[searchReview?.revision]
        return (
          <>
            {readOnly ? (
              <Typography variant='body2'>{label ?? ''}</Typography>
            ) : (
              <Controller
                name={`${params.id}.revision`}
                control={form.control}
                rules={{ required: 'Este campo es requerido' }}
                render={({ field, fieldState: { error } }) => (
                  <GenericSelect
                    {...field}
                    required={true}
                    error={!!error}
                    helperText={error ? error.message : null}
                    options={[
                      { value: 'APROBADO', label: 'Aprobado' },
                      { value: 'RECHAZADO', label: 'Rechazado' },
                    ]}
                  />
                )}
              />
            )}
          </>
        )
      },
    },
    {
      field: 'comentario',
      headerName: 'Descripción',
      minWidth: 400,
      renderCell: (params) => {
        const reviews = params?.row?.dataRevisiones
        const readOnly = validation(reviews)
        const searchReview = reviews?.find((review) => review?.dataUserAudita?.id === userData?.id)
        return (
          <>
            {readOnly ? (
              <Typography variant='body2'>{searchReview?.comentario ?? ''}</Typography>
            ) : (
              <Controller
                name={`${params.id}.comentario`}
                control={form.control}
                rules={{ required: 'Este campo es requerido' }}
                render={({ field, fieldState: { error } }) => (
                  <GenericTextfield
                    {...field}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            )}
          </>
        )
      },
    },
    {
      field: 'options',
      headerName: '',
      width: 60,
      renderCell: ({ row }) => {
        const reviews = row?.dataRevisiones
        const readOnly = validation(reviews)
        return (
          <ClassicIconButton
            color='secondary'
            onClick={() => {
              form.trigger(row.id)
              onSave(row)
            }}
            disabled={readOnly}
          >
            <Save />
          </ClassicIconButton>
        )
      },
    },
  ]

  return columns
}

export const getInfoTable = (tableInfo) => {
  const objectInfo = tableInfo?.data?.[0]

  return [
    {
      label: 'Número contrato',
      value: objectInfo?.numero_contrato ?? '',
    },
    {
      label: 'Tipo reunion',
      value: objectInfo?.tipoReunionMesaInfo?.nombre ?? '',
    },
    {
      label: 'Número mesa',
      value: objectInfo?.identificador ?? '0',
    },
    {
      label: 'Sigedoc inclusíon',
      value: objectInfo?.registroAriData?.sigedoc_inclusion ?? '',
    },
    {
      label: 'Caso individual (CAT)',
      value: objectInfo?.registroAriData?.caso_individual_cat ?? '',
    },
    {
      label: 'Fecha de reunión',
      value: formatDateToCustomString(objectInfo?.fecha_reunion),
    },
    {
      label: 'Medio de reunión',
      value: objectInfo?.medio_reunion ?? '',
    },
    {
      label: 'Valor contratado',
      value: formatColombianMoney(objectInfo?.valor_contrato_proyecto),
    },
    {
      label: 'Estado actual del proyecto',
      value: objectInfo?.estado_actual_proyecto ?? '',
    },
    {
      label: 'Avance físico actual',
      value: objectInfo?.avance_fisico_actual ? `${objectInfo?.avance_fisico_actual} %` : '',
    },
    {
      label: 'Avance financiero actual',
      value: objectInfo?.avance_financiero_actual
        ? `${objectInfo?.avance_financiero_actual} %`
        : '',
    },
    {
      label: 'Avance físico programado',
      value: objectInfo?.avance_fisico_programado
        ? `${objectInfo?.avance_fisico_programado} %`
        : '',
    },
    {
      label: 'Nombre del proyecto',
      value: objectInfo?.nombre_proyecto ?? '',
    },
    {
      label: 'Objeto del contrato',
      value: objectInfo?.objeto_contrato ?? '',
    },
    {
      label: 'Fecha actualizada de finalización del proyecto',
      value: formatDateToCustomString(objectInfo?.fecha_act_finan_proyecto),
    },
    {
      label: 'Problemática',
      value: objectInfo?.problematica ?? '',
    },
    {
      label: 'Resultados e intervenciones',
      value: objectInfo?.resultados_e_interveciones ?? '',
    },
  ]
}
