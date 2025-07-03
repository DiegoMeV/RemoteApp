import { Box, Button, Grid } from '@mui/material'
import { FormGenericContainer, FormGenericHeader } from '.'
import { useFieldArray, useForm } from 'react-hook-form'
import { handleNextStep } from '../../funcs'
import { BackdropLoading, MagicString, toArray, useEntitiesInfo } from '@/lib'
import { Add } from '@mui/icons-material'
import { EntityInputs } from './components'
import toast from 'react-hot-toast'

const handleAppend = (append) => {
  const idRegistration = crypto.randomUUID()
  const newEntity = { id: idRegistration, entity: {}, emails: '' }
  append(newEntity)
}

const RelatedEntitiesForm = ({ stepVars, basicVars }) => {
  const { step: currentStep, setActiveStep: setStep } = stepVars
  const { stepEntities, setStepEntities } = basicVars

  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      entities: toArray(stepEntities) ?? [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'entities',
  })

  const onSubmit = (data) => {
    if (data?.entities <= 0 || !data?.entities[0]?.entity) {
      toast.error(MagicString.REGISTRY.VALIDATION_DELETE_ENTITY)
      return
    }
    handleNextStep(setStep)
    setStepEntities(data?.entities ?? [])
    toast.success(MagicString.REGISTRY.SUCCESS_ENTITY_MESSAGE)
  }

  //TODO: HACER QUE EL LOV HAGA LA BUSQUEDA
  const { data: filteredRowsEntities, isLoading: loadingEntities } = useEntitiesInfo()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <FormGenericHeader title='Entidades relacionadas' />
      <FormGenericContainer
        onSubmit={handleSubmit(onSubmit)}
        currentStep={currentStep}
        setStep={setStep}
        styleContainer={{ flex: '1' }}
      >
        <BackdropLoading loading={loadingEntities || false} />
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'flex-end', py: '10px' }}
        >
          <Button
            variant='outlined'
            onClick={() => handleAppend(append)}
            startIcon={<Add />}
            size='small'
          >
            Agregar entidad
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            height: 'auto',
            maxHeight: '350px',
            overflow: 'auto',
            border: '1px solid #0000000f',
            borderRadius: '0 0 10px 10px',
            pl: 2,
            py: 1,
          }}
        >
          {fields.map((entity, index) => {
            return (
              <EntityInputs
                key={entity.id}
                getValues={getValues}
                entity={entity}
                filteredRowsEntities={filteredRowsEntities}
                index={index}
                control={control}
                isLoading={loadingEntities || false}
                setValue={setValue}
                remove={remove}
                size={{ fieldsLength: fields.length }}
              />
            )
          })}
        </Grid>
      </FormGenericContainer>
    </Box>
  )
}

export default RelatedEntitiesForm
