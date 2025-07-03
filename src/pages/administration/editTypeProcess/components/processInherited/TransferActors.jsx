import { AddCircle, Delete } from '@mui/icons-material'
import { Button, Divider, Typography } from '@mui/material'
import { variablesInputsInherited } from '../../constants'
import { ClassicIconButton, GenericForm } from '@/libV4'
import { useFieldArray } from 'react-hook-form'

const TransferActors = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'typeSpecs.parentProcessActions.actorTypesTranslation',
  })
  return (
    <>
      <div className='col-span-12 flex items-center justify-between mb-4'>
        <Typography
          variant='h6'
          color='primary'
          className='font-semibold text-primary'
        >
          Datos de los actores
        </Typography>
        <Button
          variant='contained'
          startIcon={<AddCircle />}
          onClick={() => append({})}
          className='bg-primary text-white'
        >
          Agregar datos de actores
        </Button>
      </div>
      <div className='col-span-12 flex flex-col gap-4 max-h-[400px] overflow-auto p-2'>
        {fields?.map((field, index) => {
          const inputs = variablesInputsInherited(index)
          return (
            <div
              key={field?.id}
              className='general_form_container'
            >
              <GenericForm
                inputs={inputs}
                control={control}
              />
              <div className='xs:col-span-12 xl:col-span-1 flex justify-end'>
                <ClassicIconButton
                  color='secondary'
                  hoverColor='red'
                  onClick={() => remove(index)}
                >
                  <Delete />
                </ClassicIconButton>
              </div>
              <Divider className='col-span-12' />
            </div>
          )
        })}
        {fields?.length === 0 ? (
          <div className='col-span-12'>
            <Typography
              variant='h6'
              pl={2}
            >
              No existen datos de actores actualmente
            </Typography>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default TransferActors
