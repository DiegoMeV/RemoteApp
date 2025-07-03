import { Delete } from '@mui/icons-material'
import { Divider, IconButton } from '@mui/material'
import toast from 'react-hot-toast'
import { inputsColumns } from '../constants'
import { GenericForm } from '@/libV4'

const ItemColumn = ({
  remove,
  fieldsLength,
  control,
  index,
  validationOneItem = true,
  // getValues,
  // setValue,
} = {}) => {
  const handleRemove = (position) => {
    if (validationOneItem || fieldsLength !== 1) {
      remove(position)
      return
    }

    toast.error('No se pudo eliminar, ya que al menos la lista de valores debe tener un elemento')
  }

  const ITEMS = inputsColumns(index) ?? []

  return (
    <>
      <div className='general_form_container'>
        <GenericForm
          inputs={ITEMS}
          control={control}
        />
        <div className='general_form_item xl:col-span-1 flex justify-end'>
          <IconButton
            onClick={() => handleRemove(index)}
            title={'Eliminar'}
          >
            <Delete />
          </IconButton>
        </div>
      </div>
      <Divider className='col-span-12' />
    </>
  )
}

export default ItemColumn
