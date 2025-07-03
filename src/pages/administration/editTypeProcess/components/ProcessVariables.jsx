import { ClassicIconButton } from '@/lib'
import { AddCircle, Delete } from '@mui/icons-material'
import { Button, Divider, Typography } from '@mui/material'
import { useFieldArray } from 'react-hook-form'
import { variablesInputs } from '../constants'
import { GenericForm } from '@/libV4'

const ProcessVariables = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'typeSpecs.additionalData',
  })

  return (
    <>
      <div className='col-span-12 flex justify-end'>
        <Button
          variant='contained'
          startIcon={<AddCircle />}
          onClick={() => append({})}
        >
          Agregar variable
        </Button>
      </div>
      <div className='col-span-12 flex flex-col gap-4 max-h-[400px] overflow-auto p-2'>
        {fields?.map((field, index) => {
          const inputs = variablesInputs(index)
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
              No existen variables para este tipo de proceso, puedes crearlas en el botón de agregar
            </Typography>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default ProcessVariables
