import { AddCircle, Delete } from '@mui/icons-material'
import { Button, Divider, Typography } from '@mui/material'
import { ClassicIconButton, GenericForm } from '@/libV4'
import { useFieldArray } from 'react-hook-form'
import { transferData } from '../../constants'
const TransferProcessData = ({ control }) => {
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
          Datos del proceso padre
        </Typography>
        <Button
          variant='contained'
          startIcon={<AddCircle />}
          onClick={() => append({})}
          className='bg-primary text-white'
        >
          Agregar llave a transferir
        </Button>
      </div>
      <div className='col-span-12 flex flex-col gap-4 max-h-[400px] overflow-auto p-2'>
        {fields?.length === 0 ? (
          <div className='col-span-12'>
            <Typography
              variant='h6'
              pl={2}
            >
              No existen variables a transferir actualmente
            </Typography>
          </div>
        ) : (
          fields?.map((field, index) => {
            const transferDataInputs = transferData(index)
            return (
              <div
                key={field?.id}
                className='general_form_container'
              >
                <GenericForm
                  inputs={transferDataInputs}
                  control={control}
                />
                <div className='xs:col-span-12 xl:col-span-1 flex justify-center'>
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
          })
        )}
      </div>
    </>
  )
}

export default TransferProcessData
