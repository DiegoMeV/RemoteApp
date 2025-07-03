import { Box, Button, Grid } from '@mui/material'
import { FormGenericContainer, FormGenericHeader } from '.'
import { Controller, useForm } from 'react-hook-form'
import { handleNextStep } from '../../funcs'
import { TextfieldController } from './components'
import {
  AutocompleteValueList,
  GenericSelect,
  ValueListGlobal,
  toArray,
  useBoolean,
  useGetTypeRequest,
  useGetUseInformation,
  useSearch,
} from '@/lib'
import { columns, columnsTypeRequest } from '../../constants'
import { DynamicTableAlert } from '@/app/applications/components'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const BasicDataRequirements = ({ stepVars, basicVars }) => {
  const { step: currentStep, setActiveStep: setStep } = stepVars
  const { stepBasic, setStepBasic } = basicVars

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: stepBasic,
  })

  const onSubmit = (data) => {
    if (rowDesTypeSol.length === 0) {
      toast.error('Debe seleccionar al menos una descripción de tipo solicitud')
      return
    }
    delete data.itemCapture
    const stepBasicForm = { ...data, descripcionTipoSolicitud: toArray(rowDesTypeSol) }

    setStepBasic(stepBasicForm)
    handleNextStep(setStep)
  }

  const searchTypeRequest = useSearch()
  const modalTypeRequest = useBoolean()
  const searchUseInformation = useSearch()
  const modalUseInformation = useBoolean()

  const { data: typeRequest, isLoading: loadingTypeRequest } = useGetTypeRequest({
    searchTypeRequest: searchTypeRequest?.searchText,
  })

  const { data: useInformation, isLoading: loadingUseInformation } = useGetUseInformation({
    searchUseInformation: searchUseInformation?.searchText,
  })
  const optionsTypeRequest = [
    { value: 'Consulta', label: 'Consulta' },
    {
      value: 'Cruce',
      label: ' Cruce',
    },
    { value: 'Busqueda de bienes y/o personas', label: 'Búsqueda de bienes y/o personas' },
    { value: 'Tablero', label: 'Tablero' },
    { value: 'Contratacion y Mallas', label: 'Contratación y Mallas' },
  ]

  const [rowDesTypeSol, setRowDesTypeSol] = useState(stepBasic.descripcionTipoSolicitud ?? [])

  const sortedData = useInformation?.data
    ? [...useInformation.data].sort((a, b) => a.nombre.localeCompare(b.nombre))
    : []

  const itemCapture = watch('itemCapture')

  useEffect(() => {
    if (itemCapture) {
      const extractValue = itemCapture.row
      setRowDesTypeSol([...rowDesTypeSol, extractValue])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemCapture])

  const toggleDisabled = (params) => {
    const isMatch = rowDesTypeSol?.find((item) => {
      return item?.id === params?.row?.id
    })
    return isMatch ? true : false
  }

  const columnTypeRequest = columnsTypeRequest(rowDesTypeSol, setRowDesTypeSol)

  return (
    <Box sx={{ height: '100%' }}>
      <FormGenericHeader title='Datos básicos' />
      <FormGenericContainer
        onSubmit={handleSubmit(onSubmit)}
        currentStep={currentStep}
        setStep={setStep}
        containerProps={{ spacing: 2, mt: 2 }}
        styleChild={{ ml: '0.1px', p: 2 }}
      >
        <TextfieldController
          setValue={setValue}
          name='vigenciaConsulta'
          required={false}
          control={control}
          md={6}
          label='Vigencia consulta'
        />
        <Grid
          item
          xs={12}
          md={6}
        >
          <Controller
            name={'tipoSolicitud'}
            control={control}
            render={({ field }) => (
              <GenericSelect
                {...field}
                required={true}
                InputLabelProps={{ shrink: true }}
                label='Tipo de solicitud'
                control={control}
                setValue={setValue}
                options={optionsTypeRequest}
              />
            )}
          />
        </Grid>
        <AutocompleteValueList
          controlModal={modalUseInformation}
          control={control}
          name={`usoInformacion`}
          md={6}
          label='Uso de la información'
          options={{ data: sortedData }}
          loading={loadingUseInformation ?? false}
          searchText={searchUseInformation}
          setValue={setValue}
          columns={columns}
          required={true}
        />
        <TextfieldController
          setValue={setValue}
          name='detalleUsoInfo'
          control={control}
          md={6}
          required={true}
          label='Número o nombre de actuación'
        />
        <TextfieldController
          setValue={setValue}
          name='descripcionSolicitud'
          control={control}
          md={12}
          label='Descripción de la solicitud'
          multiline={true}
          minRows={3}
        />
        <TextfieldController
          setValue={setValue}
          name='asunto'
          control={control}
          required={true}
          md={12}
          label='Asunto del requerimiento'
          multiline={true}
          minRows={4}
        />
        <Grid
          item
          xs={12}
        >
          <Button
            variant='contained'
            size='small'
            sx={{ mb: 1 }}
            onClick={modalTypeRequest.handleShow}
          >
            Agregar descripción Tipo de solicitud
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          maxHeight='400px'
          overflow='auto'
        >
          <DynamicTableAlert
            columns={columnTypeRequest ?? []}
            rows={rowDesTypeSol ?? []}
          />
        </Grid>
      </FormGenericContainer>
      {modalTypeRequest.show && (
        <ValueListGlobal
          title='Descripción Tipo de solicitud'
          loading={loadingTypeRequest}
          columns={columns}
          rows={typeRequest?.data ?? []}
          openOptions={modalTypeRequest}
          selectedOption={(newValue) => {
            setValue?.('itemCapture', newValue)
          }}
          searchOptions={searchTypeRequest}
          toggleDisabled={toggleDisabled}
          shouldClose={false}
        />
      )}
    </Box>
  )
}

export default BasicDataRequirements
