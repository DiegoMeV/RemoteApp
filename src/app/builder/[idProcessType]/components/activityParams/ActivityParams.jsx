import { Box, FormControlLabel, Grid, Switch, TextField } from '@mui/material'
import { CustomAutocomplete, MultiChoiceAutocomplete, SearchActivity, TimeInput } from '.'
import { notificationChannelTypes, optionTypes, statusProcessServices } from '../../hooks'
import {
  AutocompleteNoForm,
  ClassicIconButton,
  MagicString,
  useBoolean,
  useGetActorsType,
} from '@/lib'
import { ModalSearchDocuments } from '..'
import toast from 'react-hot-toast'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { CheckCircle } from '@mui/icons-material'

const ActivityParams = ({ formValues, setFormValues }) => {
  const selectedValues = formValues?.notificateOnReject || []
  const selectedValuesOnNewTask = formValues?.notificateOnNewTask || []

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const variationParams = useStoreState((state) => state.reactFlowState.variationParams)
  const isProcessService = variationParams?.byActionTypes === 'process'

  const valueArray = notificationChannelTypes.filter((option) =>
    selectedValues.includes(option.value)
  )

  const valueArrayOnNewTask = notificationChannelTypes.filter((option) =>
    selectedValuesOnNewTask.includes(option.value)
  )

  const modalActorType = useBoolean()
  const { data: actorsType, isLoading } = useGetActorsType({ enabled: isProcessService })

  const handleInputChange = (_, newValue, fieldName) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }))
  }

  const handleLovChange = (ev, fieldId, fieldName) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: ev?.id ?? null,
      [fieldName]: ev?.name ?? '',
    }))
  }

  const handleSetActorType = (params) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Seleccion actividad',
      content: `¿Está seguro de escoger ${params?.row?.nameActorType} como tipo de actor para la actividad?`,
      onConfirm: () => {
        setFormValues((prev) => ({
          ...prev,
          actorTypeToNotifyName: params?.row?.nameActorType ?? '',
          idActorTypeToNotify: params?.row?.idActorType ?? '',
        }))
        modalActorType?.handleShow()
        toast.success('Actividad seleccionada')
      },
    })
  }

  const columnsActorType = [
    { field: 'nameActorType', headerName: 'Nombre', width: 250 },
    { field: 'descriptionActorType', headerName: 'Descripción', width: 250 },
    {
      field: 'options',
      headerName: '',
      width: 60,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      headerAlign: 'center',
      renderCell: (params) => (
        <ClassicIconButton
          onClick={() => handleSetActorType(params)}
          color='success'
        >
          <CheckCircle />
        </ClassicIconButton>
      ),
    },
  ]

  const switches = [
    {
      label: MagicString.CONSTRUCTOR.ADVANCE_CONFIGURATION_SHOW_SUGGESTED,
      field: 'showSuggested',
    },
    {
      label: MagicString.CONSTRUCTOR.ADVANCE_CONFIGURATION_ALLOW_PARALLEL_NOTI,
      field: 'allowParallel',
    },
    {
      label: MagicString.CONSTRUCTOR.ADVANCE_CONFIGURATION_STOP_NOTI,
      field: 'stopNotification',
    },
  ]

  return (
    <Box
      bgcolor='backgroundGrey1'
      borderRadius='10px'
      p={2}
    >
      <Grid
        container
        spacing={2}
      >
        <TimeInput
          timeLabel='Duración de alerta'
          value={formValues.duration}
          onValueChange={(value) =>
            setFormValues((prev) => ({
              ...prev,
              duration: { ...prev.duration, value: parseInt(value) ?? 0 },
            }))
          }
          onUnitChange={(type) =>
            setFormValues((prev) => ({
              ...prev,
              duration: { ...prev.duration, type: type?.value ?? '' },
            }))
          }
          optionTypes={optionTypes}
        />

        <Grid
          item
          xs={6}
        >
          <TextField
            fullWidth
            value={formValues?.alerts?.warning}
            size='small'
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                alerts: { ...prev.alerts, warning: parseInt(e.target.value) },
              }))
            }
            type='number'
            label='Tiempo de alerta'
          />
        </Grid>

        <Grid
          item
          xs={6}
        >
          <TextField
            fullWidth
            size='small'
            value={formValues?.alerts?.critical}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                alerts: { ...prev.alerts, critical: parseInt(e.target.value) },
              }))
            }
            type='number'
            label='Tiempo máximo'
          />
        </Grid>

        <Grid
          item
          xs={12}
        >
          <CustomAutocomplete
            options={statusProcessServices[variationParams?.byActionTypes]}
            value={formValues.setProcessStatus}
            onChange={(e, newValue) =>
              handleInputChange(e, newValue?.value ?? null, 'setProcessStatus')
            }
            label='Cambio de estado del proceso'
          />
        </Grid>

        {isProcessService && (
          <>
            <SearchActivity
              formValues={formValues}
              setFormValues={setFormValues}
            />

            <Grid
              item
              xs={12}
            >
              <MultiChoiceAutocomplete
                label='Canales de notificación: Tarea asignada'
                options={notificationChannelTypes}
                value={valueArrayOnNewTask}
                onChange={(e, newValue) =>
                  handleInputChange(
                    e,
                    newValue?.map((opt) => opt.value) || [],
                    'notificateOnNewTask'
                  )
                }
              />
            </Grid>

            <Grid
              item
              xs={12}
            >
              <MultiChoiceAutocomplete
                label='Canales de notificación: Tarea rechazada'
                options={notificationChannelTypes}
                value={valueArray}
                onChange={(e, newValue) =>
                  handleInputChange(
                    e,
                    newValue?.map((opt) => opt.value) || [],
                    'notificateOnReject'
                  )
                }
              />
            </Grid>

            {switches.map(({ label, field }) => (
              <Grid
                item
                xs={12}
                sm={4}
                key={field}
              >
                <FormControlLabel
                  sx={{ mx: 0.5 }}
                  control={
                    <Switch
                      size='small'
                      checked={formValues?.[field]}
                      onChange={(ev) => handleInputChange(ev, ev.target.checked, field)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  labelPlacement='start'
                  label={label}
                />
              </Grid>
            ))}

            <Grid
              item
              xs={12}
            >
              <AutocompleteNoForm
                options={actorsType?.data ?? []}
                isLoading={isLoading}
                openModal={modalActorType?.handleShow}
                required={false}
                value={{
                  id: formValues?.idActorTypeToNotify ?? null,
                  name: formValues?.actorTypeToNotifyName ?? '',
                }}
                onChange={(e) => handleLovChange(e, 'idActorTypeToNotify', 'actorTypeToNotifyName')}
                label='Tipo de actor a notificar'
              />
              <ModalSearchDocuments
                columns={columnsActorType}
                open={modalActorType?.show}
                handleClose={() => modalActorType?.handleShow()}
                title='Buscar tipo de actor a notificar'
                actionType='ASSIGNMENT_ACTORTYPE'
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  )
}

export default ActivityParams
