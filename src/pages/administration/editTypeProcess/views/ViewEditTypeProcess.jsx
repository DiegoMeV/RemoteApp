import {
  BackdropLoading,
  BasicTitle,
  CustomAccordion,
  GenericForm,
  useMutationDynamicBaseUrl,
} from '@/libV4'
import { useForm } from 'react-hook-form'
import { generalVar } from '../constants'
import { Office, ProcessInherited, ProcessVariables } from '../components'
import { Button, Typography } from '@mui/material'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const ViewEditTypeProcess = ({
  idGroup,
  idProcessType,
  dataProcessType,
  isNew,
  refetchDataProcessType,
}) => {
  const navigate = useNavigate()
  const defaultValues = {
    name: dataProcessType?.name,
    numberStructure: dataProcessType?.numberStructure,
    isEnabled: dataProcessType?.isEnabled,
    description: dataProcessType?.description,
    numByLevel: dataProcessType?.numByLevel,
    numByOrigin: dataProcessType?.numByOrigin,
    duration: dataProcessType?.duration,
    durationUnit: dataProcessType?.durationUnit,
    keyName: dataProcessType?.keyName,
    typeSpecs: {
      additionalData: dataProcessType?.typeSpecs?.additionalData || [],
      parentProcessActions: {
        processDataKeys: dataProcessType?.typeSpecs?.parentProcessActions?.processDataKeys || [],
        actorTypesTranslation:
          dataProcessType?.typeSpecs?.parentProcessActions?.actorTypesTranslation || [],
      },
    },
  }

  const { control, handleSubmit } = useForm({
    defaultValues,
  })

  const { mutateAsync: modifyTypeProcess, isPending: modifyingTypeProcess } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlProcess',
      url: '/process-types',
      onSuccess: (response) => {
        toast.success('Tipo de proceso modificado correctamente')
        if (isNew) {
          navigate(`/administration/editTypeProcess/${idGroup}/${response?.data?.id}`)
          return
        }
        refetchDataProcessType()
      },
      onError: (e) => {
        toast.error(e?.message ?? 'Error al modificar el tipo de proceso')
      },
    })

  const onSubmit = (data) => {
    // Transformar actorTypesTranslation a un arreglo de arreglos
    const actorTypesTranslation = data.typeSpecs?.parentProcessActions?.actorTypesTranslation || []

    const transformedActorTypesTranslation = actorTypesTranslation?.map((group) => {
      if (Array.isArray(group))
        return group?.map((actor) => {
          if (typeof actor === 'string') return actor
          return actor.keyName
        })
      return Object.values(group).map((actor) => {
        if (typeof actor === 'string') return actor
        return actor.keyName
      })
    })

    // Actualizar los datos transformados en el objeto principal
    data.typeSpecs.parentProcessActions.actorTypesTranslation = transformedActorTypesTranslation

    // Enviar los datos al backend
    if (isNew) {
      modifyTypeProcess({ body: { idGroup, ...data } })
      return
    }
    modifyTypeProcess({
      body: { idGroup, ...data },
      qry: `/${idProcessType}`,
      methodBody: 'put',
    })
  }

  return (
    <>
      <BasicTitle
        title={isNew ? 'Creación de tipo de proceso' : 'Edición de tipo de proceso'}
        backpath={`/administration/groupProcess/${idGroup}`}
      />
      <BackdropLoading loading={modifyingTypeProcess} />
      <form
        className='general_form_container p-4 backgroundGray1 max-h-[calc(100vh-200px)] overflow-auto'
        onSubmit={handleSubmit(onSubmit)}
      >
        <GenericForm
          inputs={generalVar}
          control={control}
        />

        {!isNew ? (
          <Office idProcessType={idProcessType} />
        ) : (
          <Typography
            variant='h6'
            p={2}
            className='col-span-12'
          >
            Para agregar dependencias primero debe guardar el tipo de proceso
          </Typography>
        )}

        <CustomAccordion
          title='Heredar datos del proceso padre'
          accordionprops={{ className: 'col-span-12' }}
        >
          <ProcessInherited control={control} />
        </CustomAccordion>

        <CustomAccordion
          title='Variables de tipo de proceso'
          accordionprops={{ className: 'col-span-12' }}
        >
          <ProcessVariables control={control} />
        </CustomAccordion>
        <div className='col-span-12 flex justify-end gap-4'>
          <Button
            variant='contained'
            color='error'
          >
            Cancelar
          </Button>

          <Button
            variant='contained'
            type='submit'
          >
            Guardar
          </Button>
        </div>
      </form>
    </>
  )
}

export default ViewEditTypeProcess
