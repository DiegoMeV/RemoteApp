import { FormGenericContainer, FormGenericHeader } from '.'
import { Box, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import {
  AutocompleteDependencies,
  AutocompleteTypeProcess,
  TextfieldController,
} from './components'
import { getSigedocRows, handleNextStep } from '../../funcs'
import {
  AutocompleteValueList,
  CheckboxInput,
  useBoolean,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { useEffect, useState } from 'react'
import { columnsProcessRelated } from '../../constants'
import { useStoreState } from 'easy-peasy'

const SelectProcessRequirements = ({ stepVars, processTypes, selectVars, infoGroup }) => {
  const { step: currentStep, setActiveStep: setStep } = stepVars
  const { stepSelect, setStepSelect } = selectVars

  const userData = useStoreState((state) => state.user.userData || [])

  const { control, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: { ...stepSelect },
  })

  const currentValues = getValues()

  const onSubmit = (data) => {
    handleNextStep(setStep)
    setStepSelect(data)
  }

  const accessAutocompleteTypeProcess = watch('access')
  const dependencyWatch = watch('dependency')

  const modalRelatedProcess = useBoolean()
  const searchRelatedProcess = useSearch()

  const { data: registeredProcesses, isLoading } = useQueryDynamicApi({
    baseKey: 'urlProcess',
    url: `/processes?idOfficeOrigin=${dependencyWatch?.id}&idProcessTypeGroup=${infoGroup?.id}`,
    isCompanyRequest: true,
    enabled: !!dependencyWatch?.id && !!accessAutocompleteTypeProcess,
  })

  const [rows, setRows] = useState({})

  const defaultValueDependency =
    userData?.dependencies.length === 1 ? userData?.dependencies[0] : null

  useEffect(() => {
    if (registeredProcesses?.success) {
      const dataRows = registeredProcesses?.data?.map(getSigedocRows)
      setRows({
        data: dataRows ?? [],
      })
    }
  }, [registeredProcesses])

  useEffect(() => {
    setValue('dependency', stepSelect.dependency ?? defaultValueDependency)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepSelect, defaultValueDependency])

  useEffect(() => {
    if (!accessAutocompleteTypeProcess) {
      setValue('relatedRequirements', null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessAutocompleteTypeProcess])

  return (
    <Box sx={{ height: '100%' }}>
      <FormGenericHeader title='Selección de proceso' />
      <FormGenericContainer
        onSubmit={handleSubmit(onSubmit)}
        currentStep={currentStep}
        setStep={setStep}
      >
        <AutocompleteDependencies
          control={control}
          md={9}
          setValue={setValue}
          currentValues={currentValues}
        />
        <Grid
          xs={12}
          md={3}
          item
          sx={{ pt: 3, px: 2 }}
        >
          <CheckboxInput
            item={{ name: 'access', label: 'Alcance Requerimiento Inicial', defaultValue: false }}
            control={control}
          />
        </Grid>
        <AutocompleteTypeProcess
          md={12}
          processTypes={processTypes}
          control={control}
          setValue={setValue}
          currentValues={currentValues}
        />
        {accessAutocompleteTypeProcess && (
          <Grid
            xs={12}
            md={12}
            item
            sx={{ pt: 3, px: 2 }}
          >
            <AutocompleteValueList
              controlModal={modalRelatedProcess}
              control={control}
              name={'relatedRequirements'}
              md={12}
              label='Es alcance   de   un   requerimiento'
              options={rows ?? []}
              loading={isLoading ?? false}
              searchText={searchRelatedProcess}
              setValue={setValue}
              columns={columnsProcessRelated}
              disabled={!dependencyWatch?.id && !accessAutocompleteTypeProcess}
              required={true}
            />
          </Grid>
        )}
        <TextfieldController
          style={{ py: 3, px: 2 }}
          name='description'
          control={control}
          label={'Agregue una descripción'}
          multiline={true}
          minRows={3}
          maxRows={3}
          currentValues={currentValues}
        />
      </FormGenericContainer>
    </Box>
  )
}

export default SelectProcessRequirements
