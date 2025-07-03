import { GenericForm } from '@/libV4'
import { INPUTS_TYPE_SAVE_FORM } from '../../constants'
import FormCreateLov from '../../../rageInputs/FormCreateLov'
import { Button } from '@mui/material'

const ModalAdvanceSaveForm = ({ form = {}, fieldArray = {}, variableType = '' } = {}) => {
  // const { fields, append, remove } = fieldArray

  const isLov = variableType === 'lov'

  const inputs = INPUTS_TYPE_SAVE_FORM[variableType] || []

  const handleAppend = () => {
    const idItem = crypto.randomUUID()
    const newOption = { id: idItem, label: '', value: '' }
    fieldArray?.append(newOption)
  }

  // TO-DO: Pendiente uso en FormCreateLov
  // option={option}
  // key={option.id}
  // index={i}
  // titleFirstInput={title}
  // remove={remove}
  // fieldsLength={fields.length}
  // control={control}
  // arrayName={arrayName}

  return (
    <div>
      {isLov && (
        <div className='flex justify-end mb-3'>
          <Button onClick={handleAppend}>Agregar opcion</Button>
        </div>
      )}
      {!isLov ? (
        <div className='general_form_container'>
          <GenericForm
            inputs={inputs}
            control={form?.control}
          />
        </div>
      ) : (
        <div className=''>
          {fieldArray?.fields?.map((item, i) => {
            return (
              <FormCreateLov
                index={i}
                option={item}
                key={item?.id}
                control={form?.control}
                remove={fieldArray?.remove}
                titleFirstInput={'Ingrese label'}
                fieldsLength={fieldArray?.fields?.length}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ModalAdvanceSaveForm
