import { Button } from '@mui/material'
import { useFieldArray } from 'react-hook-form'
import { ItemColumn } from '.'

const handleAppend = (append) => {
  const idItem = crypto.randomUUID()
  const newOption = { id: idItem, title: '', source: '' }
  append(newOption)
}

const ContentArrColumns = ({ control, getValues, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'groupSpecs.inboxProps.columns',
  })

  return (
    <>
      <div className='col-span-12 flex justify-end'>
        <Button
          variant='contained'
          onClick={() => handleAppend(append)}
        >
          Agregar columna
        </Button>
      </div>
      <div className='col-span-12 flex flex-col gap-4 py-2 max-h-[calc(100vh-350px)] overflow-y-auto'>
        {fields?.map((item, index) => {
          return (
            <ItemColumn
              key={item.id}
              index={index}
              item={item}
              remove={remove}
              control={control}
              setValue={setValue}
              getValues={getValues}
            />
          )
        })}
      </div>
    </>
  )
}

export default ContentArrColumns
