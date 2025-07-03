import {
  AutocompleteNoForm,
  AutocompleteSelectDG,
  GenericDatePicker,
  GenericTextfield,
  TextFieldEditingDG,
  formatColombianMoney,
  formatToLocaleDateString,
} from '@/lib'
import { TableOptions } from '../components'
import { GridRowModes } from '@mui/x-data-grid-premium'
import { selectAutocompleteMember } from './formularios'
import { TextField, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { NumericFormat } from 'react-number-format'
import toast from 'react-hot-toast'

export const columnOption = (
  rowModesModel,
  setRowModesModel,
  newRow,
  setNewRow,
  setRows,
  delItem,
  editable,
  shouldDelete,
  apiRef,
  initialRef
) => {
  const handleEditClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }
  const handleSaveClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }
  const handleCancelClick = (id) => {
    if (newRow) {
      setRows((prev) => prev?.filter?.((row) => row.id !== id))
      setNewRow(false)
      return
    }
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })
    if (initialRef?.current) {
      apiRef?.current?.updateRows(initialRef?.current)
    }
  }
  const handleDeleteClick = (id) => {
    delItem?.(id)
  }

  return {
    field: 'options',
    headerName: '',
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    renderCell: (params) => {
      if (params.rowNode?.type === 'pinnedRow') {
        return <></>
      }
      return (
        <TableOptions
          params={params}
          rowModesModel={rowModesModel}
          editable={editable ?? true}
          handleEditClick={handleEditClick}
          handleSaveClick={handleSaveClick}
          handleCancelClick={handleCancelClick}
          handleDeleteClick={handleDeleteClick}
          shouldDelete={shouldDelete}
        />
      )
    },
  }
}

export const columnsMembers = ({
  terceros,
  loadingTerceros,
  errorTerceros,
  apiRef,
  modalTerceros,
  setRowParams,
  searchTercero,
}) => {
  return [
    {
      field: 'tercero',
      headerName: 'Nombre',
      editable: true,
      minWidth: 300,
      valueGetter: (params) => {
        return `${params?.row?.tercero?.nombre ?? ''}`
      },
      renderEditCell: (params) => {
        return (
          <AutocompleteNoForm
            options={terceros}
            isLoading={loadingTerceros}
            error={errorTerceros}
            getOptionLabel={(option) => option?.nombre_completo ?? option?.nombre ?? ''}
            onChange={(newValue) => selectAutocompleteMember(apiRef, params, newValue)}
            handleSearch={searchTercero}
            openModal={() => {
              modalTerceros?.handleShow()
              setRowParams(params)
            }}
            {...params}
          />
        )
      },
    },
    {
      field: 'tipo_identificacion',
      headerName: 'Tipo de identificación',
      minWidth: 250,
      editable: true,
      valueGetter: (params) => {
        return `${params?.row?.tercero?.tipo_identificacion ?? ''}`
      },
      renderEditCell: (params) => {
        return params?.row?.tercero?.tipo_identificacion ?? ''
      },
    },
    {
      field: 'numero_identificacion',
      headerName: 'Número de identificación',
      minWidth: 300,
      editable: true,
      valueGetter: (params) => {
        return `${params?.row?.tercero?.nro_identificacion ?? ''}`
      },
      renderEditCell: (params) => {
        return params?.row?.tercero?.nro_identificacion ?? ''
      },
    },
  ]
}

export const columnsResourceOrigin = ({ originsOptions, onChangePercentage, ResourceOrigin }) => {
  const idResources = ResourceOrigin?.data?.map((resource) => resource?.fte_finan_id)

  return [
    {
      field: 'origen',
      headerName: 'Origen',
      minWidth: 200,
      editable: true,
      renderCell: (params) => {
        return params?.row?.nombre_fte_finan ?? ''
      },
      renderEditCell: (params) => {
        return (
          <AutocompleteSelectDG
            options={originsOptions}
            getOptionDisabled={(option) => idResources?.includes(option.id)}
            {...params}
          />
        )
      },
    },
    {
      field: 'valor',
      headerName: 'Porcentaje',
      minWidth: 200,
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      editable: true,
      renderCell: (params) => <Typography variant='body2'>{params?.value ?? ''}%</Typography>,
      renderEditCell: ({ id, field, value }) => (
        <GenericTextfield
          size='medium'
          type='number'
          value={value}
          onChange={(e) => onChangePercentage(id, field, e.target.value)}
          InputProps={{
            endAdornment: '%',
          }}
        />
      ),
    },
    {
      field: 'descripcion',
      headerName: 'Observación',
      flex: 1,
      editable: true,
      renderEditCell: (params) => <TextFieldEditingDG {...params} />,
    },
  ]
}

export const columnsByTypeAmendment = ({
  type,
  terceros,
  loadingTerceros,
  searchTercero,
  modalTerceros,
  apiRef,
  setRowParams,
  selectAutocompleteTercero,
  watch,
}) => {
  const originsOptions = {
    ADICION: columnsAdditionOrReduction(apiRef, watch),
    REDUCCION: columnsAdditionOrReduction(apiRef, watch),
    CESION: columnsCesion(
      terceros,
      loadingTerceros,
      searchTercero,
      modalTerceros,
      setRowParams,
      selectAutocompleteTercero,
      apiRef,
      watch
    ),
    PRORROGA: columnsExtensionOrSuspension(apiRef, watch),
    SUSPENSION: columnsExtensionOrSuspension(apiRef, watch),
  }
  return originsOptions[type]
}

const columnsAdditionOrReduction = (apiRef, watch) => {
  const onChangeDate = (params, newValue) => {
    apiRef.current.setEditCellValue({ id: params.id, field: params.field, value: newValue })
  }
  const onChangeValue = (params, newValue) => {
    apiRef.current.setEditCellValue({ id: params.id, field: params.field, value: newValue })
  }
  return [
    {
      field: 'fecha',
      headerName: 'Fecha',
      minWidth: 200,
      editable: true,
      renderCell: (params) => (
        <Typography variant='body2'>{formatToLocaleDateString(params?.value)}</Typography>
      ),
      renderEditCell: (params) => {
        const value = params?.value ? dayjs(params?.value) : null
        return (
          <GenericDatePicker
            value={value}
            datePickerProps={{
              minDate: watch('fecha_suscripcion'),
              onChange: (newValue) => {
                onChangeDate(params, newValue)
              },
            }}
            textFieldProps={{
              size: 'medium',
            }}
          />
        )
      },
    },
    {
      field: 'valor',
      headerName: 'Valor',
      minWidth: 200,
      editable: true,
      renderEditCell: (params) => {
        return (
          <NumericFormat
            value={params.value}
            customInput={TextField}
            onValueChange={(values) => {
              if (values?.value < 0) {
                onChangeValue(params, '')
                return toast.error('El valor no puede ser negativo')
              }
              onChangeValue(params, values.value)
            }}
            fullWidth
            prefix='$'
            thousandSeparator
          />
        )
      },
      renderCell: (params) => `${formatColombianMoney(params.value)}`,
    },
    {
      field: 'descripcion',
      headerName: 'Observación',
      flex: 1,
      editable: true,
      renderEditCell: (params) => <TextFieldEditingDG {...params} />,
    },
  ]
}
const columnsCesion = (
  terceros,
  loadingTerceros,
  searchTercero,
  modalTerceros,
  setRowParams,
  selectAutocompleteTercero,
  apiRef,
  watch
) => {
  const onChangeDate = (params, newValue) => {
    apiRef.current.setEditCellValue({ id: params.id, field: params.field, value: newValue })
  }

  const fechaSubscripcion = watch('fecha_suscripcion')
  return [
    {
      field: 'terceroInfo',
      headerName: 'Tercero',
      width: 350,
      editable: true,
      renderCell: (params) => {
        return (
          <Typography variant='body2'>{params?.row?.terceroInfo?.nombre_completo ?? ''}</Typography>
        )
      },
      renderEditCell: (params) => {
        return (
          <AutocompleteNoForm
            value={params.value}
            options={terceros}
            handleSearch={searchTercero?.handleSearchText}
            getOptionLabel={(option) => option?.nombre_completo ?? ''}
            isLoading={loadingTerceros}
            size='medium'
            placeholder='Buscar tercero'
            openModal={() => {
              modalTerceros.handleShow()
              setRowParams(params)
            }}
            onChange={(newValue) => selectAutocompleteTercero(apiRef, params, newValue)}
          />
        )
      },
    },
    {
      field: 'tipo_identificacion',
      headerName: 'Tipo de identificación',
      width: 350,
      editable: true,
      valueGetter: (params) => {
        return `${params.row?.terceroInfo?.tipo_identificacion ?? ''}`
      },
      renderEditCell: (params) => {
        return params.row?.terceroInfo?.tipo_identificacion ?? ''
      },
    },
    {
      field: 'nro_identificacion',
      headerName: 'Identificación',
      width: 350,
      editable: true,
      valueGetter: (params) => `${params.row?.terceroInfo?.nro_identificacion ?? ''}`,
      renderEditCell: (params) => {
        return params.row?.terceroInfo?.nro_identificacion ?? ''
      },
    },
    {
      field: 'fecha',
      headerName: 'Fecha',
      minWidth: 200,
      editable: true,
      renderCell: (params) => {
        return <Typography variant='body2'>{formatToLocaleDateString(params?.value)}</Typography>
      },
      renderEditCell: (params) => {
        const value = params?.value ? dayjs(params?.value) : null
        return (
          <GenericDatePicker
            value={value}
            minDate={fechaSubscripcion}
            datePickerProps={{
              onChange: (newValue) => {
                onChangeDate(params, newValue)
              },
            }}
            textFieldProps={{
              size: 'medium',
            }}
          />
        )
      },
    },
    {
      field: 'descripcion',
      headerName: 'Observación',
      width: 350,
      editable: true,
      renderEditCell: (params) => <TextFieldEditingDG {...params} />,
    },
  ]
}

export const columnsTerceros = [
  {
    field: 'nombre_completo',
    headerName: 'Nombre',
    width: 300,
  },
  {
    field: 'tipo_identificacion',
    headerName: 'Tipo de identificación',
    width: 200,
  },
  {
    field: 'nro_identificacion',
    headerName: 'Número de identificación',
    width: 200,
  },
]

const columnsExtensionOrSuspension = (apiRef, watch) => {
  const onChangeDate = (params, newValue) => {
    apiRef.current.setEditCellValue({ id: params.id, field: params.field, value: newValue })
  }
  return [
    {
      field: 'fecha',
      headerName: 'Fecha inicial',
      minWidth: 200,
      editable: true,
      renderCell: (params) => (
        <Typography variant='body2'>{formatToLocaleDateString(params?.value)}</Typography>
      ),
      renderEditCell: (params) => {
        const value = params?.value ? dayjs(params?.value) : null
        return (
          <GenericDatePicker
            value={value}
            datePickerProps={{
              minDate: watch('fecha_suscripcion'),
              onChange: (newValue) => {
                onChangeDate(params, newValue)
              },
            }}
            textFieldProps={{
              size: 'medium',
            }}
          />
        )
      },
    },
    {
      field: 'fecha_hasta',
      headerName: 'Fecha final',
      minWidth: 200,
      editable: true,
      renderCell: (params) => (
        <Typography variant='body2'>{formatToLocaleDateString(params?.value)}</Typography>
      ),
      renderEditCell: (params) => {
        const value = params?.value ? dayjs(params?.value) : null
        return (
          <GenericDatePicker
            value={value}
            datePickerProps={{
              minDate: watch('fecha_suscripcion'),
              value: value,
              onChange: (newValue) => {
                onChangeDate(params, newValue)
              },
            }}
            textFieldProps={{
              size: 'medium',
            }}
          />
        )
      },
    },
    {
      field: 'descripcion',
      headerName: 'Observación',
      flex: 1,
      editable: true,
      renderEditCell: (params) => <TextFieldEditingDG {...params} />,
    },
  ]
}
export const columnsRegions = ({
  cities,
  handleSearchText,
  loadingCities,
  selectAutocompleteCitie,
  modalCities,
  provinces,
  handleSearchTextProvince,
  loadingProvinces,
  selectAutocompleteProvince,
  modalProvinces,
  setRowParams,
  apiRef,
  setIdProvince,
}) => [
  {
    field: 'regionInfo',
    headerName: 'Región',
    width: 300,
    editable: true,
    renderCell: (params) => {
      return (
        <Typography variant='body2'>
          {params?.row?.departamentoInfo?.regionInfo?.nombre ?? ''}
        </Typography>
      )
    },
    renderEditCell: (params) => params?.row?.regionInfo?.nombre ?? '',
  },
  {
    field: 'sateliteInfo',
    headerName: 'Satelital',
    width: 300,
    editable: true,
    renderCell: (params) => {
      return (
        <Typography variant='body2'>
          {params?.row?.departamentoInfo?.sateliteInfo?.nombre ?? ''}
        </Typography>
      )
    },
    renderEditCell: (params) => params?.row?.sateliteInfo?.nombre ?? '',
  },
  {
    field: 'departamentoInfo',
    headerName: 'Departamento',
    editable: true,
    width: 350,
    renderCell: (params) => {
      return <Typography variant='body2'>{params?.row?.departamentoInfo?.nombre ?? ''}</Typography>
    },
    renderEditCell: (params) => {
      return (
        <AutocompleteNoForm
          options={provinces}
          onChange={(newValue) => {
            if (newValue) {
              setIdProvince(newValue.id)
            } else {
              setIdProvince(null)
            }
            selectAutocompleteProvince(apiRef, params, newValue)
          }}
          handleSearch={handleSearchTextProvince}
          isLoading={loadingProvinces}
          openModal={() => {
            modalProvinces?.handleShow()
            setRowParams(params)
          }}
          {...params}
        />
      )
    },
  },
  {
    field: 'municipioInfo',
    headerName: 'Municipio',
    width: 350,
    editable: true,
    renderCell: (params) => {
      return params?.row?.municipioInfo?.nombre ?? ''
    },
    renderEditCell: (params) => {
      return (
        <AutocompleteNoForm
          options={cities}
          onChange={(newValue) => selectAutocompleteCitie(apiRef, params, newValue)}
          handleSearch={handleSearchText}
          openModal={() => {
            modalCities?.handleShow()
            setRowParams(params)
          }}
          isLoading={loadingCities}
          {...params}
        />
      )
    },
  },
]
