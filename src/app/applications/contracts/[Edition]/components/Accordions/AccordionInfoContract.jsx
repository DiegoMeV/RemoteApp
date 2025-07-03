import {
  ChooseInput,
  CustomAccordion,
  GenericForm,
  ValueListGlobal,
  useBoolean,
  useGetTerceros,
  useSearch,
} from '@/lib'
import { Grid } from '@mui/material'
import { inputsContract } from '../../funcs'
import { useStoreActions } from 'easy-peasy'
import { columnsVLSuscriptors, suscriptorInputs } from './AditionalData/funcs'
import { useState } from 'react'
const AccordionInfoContract = ({
  control,
  setValue,
  watch,
  modalTypeContract,
  autocompletes,
  isNewContract,
}) => {
  const setModalShow = useStoreActions((actions) => actions.modalFuncs.setModalShow)
  const setBackPathUrl = useStoreActions((actions) => actions.backPathUrl.setBackPathUrl)
  const inputs = inputsContract(
    autocompletes,
    modalTypeContract,
    setBackPathUrl,
    setModalShow,
    isNewContract,
    setValue,
    watch
  )
  const contractType = watch('tipoContrato')
  const conditionalAdditionalData =
    contractType?.id === '181D549F-152B-495D-B8DA-EB4D3D73D358' ||
    contractType?.nombre === 'CONVENIO INTERADMINISTRATIVO' ||
    contractType?.id === 'E8CB9A8D-7682-4A86-87BB-0396C10EE034' ||
    contractType?.nombre === 'CONTRATO INTERADMINISTRATIVO'

  const modalTerceros = useBoolean()
  const searchTerceros = useSearch()
  const [nameVL, setNameVL] = useState('')

  const qry = searchTerceros.searchText ? `&palabraClave=${searchTerceros.searchText}` : ''

  const { data: entities, isLoading: loadingEntities } = useGetTerceros({
    qry: `?tipo=entidad${qry}`,
    enabled: conditionalAdditionalData,
  })

  const onChangeEntidad = (newValue, name) => {
    setValue(name, newValue)
  }

  const additionalInputs = suscriptorInputs({
    entities,
    loadingEntities,
    modalTerceros,
    setNameVL,
    onChangeEntidad,
    searchTerceros,
  })
  return (
    <CustomAccordion
      title='Información de contrato'
      defaultExpanded={true}
    >
      <Grid
        container
        spacing={2}
        pt={2}
      >
        {inputs?.map((input, index) => (
          <ChooseInput
            key={index}
            control={control}
            item={input}
            setValue={setValue}
          />
        ))}

        {conditionalAdditionalData && (
          <>
            <GenericForm
              inputs={additionalInputs}
              control={control}
            />
            <ValueListGlobal
              openOptions={modalTerceros}
              searchOptions={searchTerceros}
              rows={entities?.data ?? []}
              columns={columnsVLSuscriptors}
              loading={loadingEntities}
              selectedOption={({ row }) => {
                onChangeEntidad(row, nameVL)
              }}
            />
          </>
        )}
      </Grid>
    </CustomAccordion>
  )
}

export default AccordionInfoContract
