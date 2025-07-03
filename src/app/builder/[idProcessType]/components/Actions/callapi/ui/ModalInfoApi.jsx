import { CustomModal } from '@/lib'
import { Box } from '@mui/material'
import { useFieldArray } from 'react-hook-form'
import FormCreateLov from '../../../rageInputs/FormCreateLov'
import { ButtonAddItem } from '../../subcomponentsActions'

const types = {
  body: { title: 'Elementos para el Body', arrayName: 'body' },
  headers: { title: 'Elementos para el Header', arrayName: 'headers' },
}

const ModalInfoApi = ({
  open,
  control,
  typeModal,
  handleClose,
  watch,
  handleSaveElement,
  getValues,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: types[typeModal]?.arrayName,
  })

  const handleSaveModalInfo = (ev) => {
    ev.preventDefault()
    /*
      TODO:
      Por el momento este watch no hace nada, lo que deberia hacer es comprobar que cada input se haya llenado con datos
      sino, no guarda los items creados y debe marcar los que le hacen falta por llenar
    */
    watch(types[typeModal]?.arrayName)
    const data = getValues()
    handleSaveElement(data)
    handleClose()
  }

  /*
  TO-DO:
  const parameters = watch(types[typeModal]?.arrayName)

  const handleSaveModalInfo = (ev) => {
    ev.preventDefault()
    const allFieldsFilled = proveValueNotNull(parameters)

    if (!allFieldsFilled) {
      toast.error('Faltan campos por llenar')
      return
    }

    const valueToSend = keyValueArr(parameters) ?? {}

    setValue(types[typeModal]?.arrayName, valueToSend)
    const data = getValues()
    handleSaveElement(data)
    handleClose()
  }
  */

  const actions = [
    {
      label: 'Cancelar',
      color: 'error',
      variant: 'contained',
      onClick: () => handleClose(),
    },
    {
      label: 'Guardar',
      variant: 'contained',
      type: 'submit',
    },
  ]
  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      modalType='form'
      size='lg'
      onSubmit={handleSaveModalInfo}
      title={types[typeModal]?.title}
      actions={actions}
    >
      <Box
        width='100%'
        maxHeight='300px'
        minHeight='300px'
      >
        <ButtonAddItem append={append} />
        {fields.map((item, i) => {
          return (
            <FormCreateLov
              option={item}
              key={item.id}
              index={i}
              remove={remove}
              control={control}
              arrayName={types[typeModal]?.arrayName}
            />
          )
        })}
      </Box>
    </CustomModal>
  )
}

export default ModalInfoApi
