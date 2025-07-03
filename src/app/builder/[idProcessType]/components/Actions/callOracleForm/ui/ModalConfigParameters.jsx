import { CustomModal } from '@/lib'
import { Box } from '@mui/material'
import { ButtonAddItem } from '../../subcomponentsActions'
import { useFieldArray } from 'react-hook-form'
import FormCreateLov from '../../../rageInputs/FormCreateLov'
import toast from 'react-hot-toast'
import {
  convertObjToArr,
  keyValueArr,
  proveValueNotNull,
} from '@/app/builder/[idProcessType]/funcs'
import { useEffect } from 'react'

const ModalConfigParameters = ({
  open,
  handleClose,
  control,
  watch,
  setValue,
  element,
  handleSaveElement,
  getValues,
  arrayName = 'actionItemSpecs.oracleFormCall.parameters',
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: arrayName,
  })

  const parameters = watch(arrayName)

  // TO-DO
  // element?.actionItemSpecs?.oracleFormCall?.parameters
  const parametersOracle = convertObjToArr({
    obj: parameters ?? element?.actionItemSpecs?.oracleFormCall?.parameters ?? {},
  })

  useEffect(() => {
    if (open && parametersOracle) {
      setValue(arrayName, parametersOracle)
      return
    }
  }, [])

  const handleSaveModalInfo = (ev) => {
    ev.preventDefault()
    const allFieldsFilled = proveValueNotNull(parameters)

    if (!allFieldsFilled) {
      toast.error('Faltan campos por llenar')
      return
    }

    const valueToSend = keyValueArr(parameters) ?? {}

    setValue(arrayName, valueToSend)
    const data = getValues()
    handleSaveElement(data)
    handleClose()
  }

  const handleCloseConfigInfo = () => {
    const valueToSend = keyValueArr(parameters ?? []) ?? {}
    setValue(arrayName, valueToSend)
    handleClose()
  }

  const actions = [
    {
      label: 'Cancelar',
      color: 'error',
      variant: 'contained',
      onClick: handleCloseConfigInfo,
    },
    {
      label: 'Guardar',
      variant: 'contained',
      type: 'submit',
      //   disabled: true,
    },
  ]

  return (
    <CustomModal
      open={open}
      handleClose={handleCloseConfigInfo}
      modalType='form'
      size='lg'
      title={'Parametros de configuración'}
      actions={actions}
      onSubmit={handleSaveModalInfo}
    >
      <Box
        width='100%'
        maxHeight='300px'
        minHeight='300px'
      >
        <ButtonAddItem
          title={'Agregar parametro'}
          append={append}
        />
        {fields?.map((item, i) => {
          return (
            <FormCreateLov
              option={item}
              key={item.id}
              index={i}
              titleFirstInput={'Nombre Parametro'}
              remove={remove}
              control={control}
              arrayName={arrayName}
            />
          )
        })}
      </Box>
    </CustomModal>
  )
}

export default ModalConfigParameters
