import { Box } from '@mui/material'
import { FormContainerSubmit, FormHeaderInfo } from '.'
import { useForm } from 'react-hook-form'
import {
  AutocompleteDependencies,
  TextfieldController,
} from '@/app/inbox/requirements/[idGroup]/components/Form/components'
import { BackdropLoading, useCreateRequirement, useSigedocInfo, toArray, MagicString } from '@/lib'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ModalSummaryRequirements } from '@/app/inbox/requirements/[idGroup]/components'
import { useStoreActions } from 'easy-peasy'
import { infoRequirementsBody, sigedocInfo } from '../funcs'

const FormInfoRequirements = ({ idTypeProcess }) => {
  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {},
  })

  const currentValues = getValues()

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const [sigedoc, setSigedoc] = useState('')
  const [processIdentifier, setProcessIdentifier] = useState('')
  const [open, setOpen] = useState(false)

  const { data: dataSigedoc, isLoading, isError } = useSigedocInfo({ id: sigedoc })

  const handleBlur = (ev) => {
    setSigedoc(ev.target.value)
  }

  useEffect(() => {
    sigedocInfo(isLoading, dataSigedoc, isError, setValue)
  }, [isLoading, dataSigedoc, isError, setValue])

  const onSuccessEvent = (response) => {
    setProcessIdentifier(response)
    toast.success(MagicString.REGISTRY.CREATE)
    setOpen(true)
  }

  const onErrorEvent = (err) => {
    if (err) {
      toast.error(err?.response?.data?.error)
      return
    }
    toast.error('Ha ocurrido un error')
  }

  const { mutateAsync: createRequirements, isPending: loadingCreation } = useCreateRequirement({
    onSuccess: onSuccessEvent,
    onError: onErrorEvent,
  })

  const onSubmit = (data) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Activar',
      content: '¿Esta seguro que desea activar este proceso?',
      onConfirm: () => {
        const [dataDoc] = toArray(dataSigedoc?.data) ?? []
        const SIGEDOC = dataDoc?.DocumentoComunicacion
        const body = infoRequirementsBody(data, idTypeProcess, SIGEDOC)
        createRequirements(body)
      },
    })
  }

  return (
    <Box
      sx={{
        pt: 2,
        pl: 1.5,
        pr: { xs: 1.5, md: 5 },
        height: '100%',
      }}
    >
      {/* TODO: El title ponerlo con el nombre del tipo de proceso */}
      <FormHeaderInfo title={`Radicación`} />
      <FormContainerSubmit onSubmit={handleSubmit(onSubmit)}>
        <BackdropLoading loading={isLoading || loadingCreation} />

        <AutocompleteDependencies
          control={control}
          setValue={setValue}
          currentValues={currentValues}
          md={4}
        />

        <TextfieldController
          setValue={setValue}
          style={{ pt: 3, px: 1 }}
          name='sigedocEntrada'
          required={true}
          control={control}
          md={4}
          label='SIGEDOC Entrada'
          onBlur={handleBlur}
        />

        <TextfieldController
          setValue={setValue}
          style={{ pt: 3, px: 1 }}
          name='SIGEDOCfechaRadicacion'
          control={control}
          md={4}
          label='Fecha radicación SIGEDOC'
          type='datetime-local'
          disabled={true}
          currentValues={currentValues}
          helperText={'Ingresa en SIGEDOC Entrada'}
        />

        <TextfieldController
          setValue={setValue}
          style={{ pt: 2, pb: 4, px: 1 }}
          name='descripcionSolicitud'
          control={control}
          md={12}
          label='Descripción de la solicitud'
          multiline={true}
          minRows={3}
        />
      </FormContainerSubmit>
      <ModalSummaryRequirements
        open={open}
        processIdentifier={processIdentifier}
      />
    </Box>
  )
}

export default FormInfoRequirements
