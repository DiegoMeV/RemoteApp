import { BackdropLoading, GenericForm, useMutationDynamicBaseUrl } from '@/libV4'
import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const AddActor = ({ idProcess, onSuccess, onCancel }) => {
  const form = useForm()

  const inputs = [
    {
      label: 'Actor',
      name: 'actorData',
      required: true,
      type: 'autocompleteRequest',
      queryRequest: { querySearch: 'querySearch', additionalQuery: '&isActive=true' },
      requestprops: {
        baseKey: 'urlUsers',
        url: '/users',
      },
      vlprops: {
        columns: [
          {
            dataIndex: 'name',
            title: 'Nombre',
            render: (_, row) => `${row?.firstName ?? ''} ${row?.lastName ?? ''}`,
          },
        ],
      },
      autocompleteprops: {
        getOptionLabel: (option) => `${option?.firstName ?? ''} ${option?.lastName ?? ''}`,
      },
      className: 'col-span-12',
    },
    {
      label: 'Tipo de actor',
      name: 'actorTypeKey',
      required: true,
      type: 'autocompleteRequest',
      requestprops: {
        isCompanyRequest: false,
        baseKey: 'urlProcess',
        url: '/actor-types',
      },
      vlprops: {
        columns: [
          {
            dataIndex: 'name',
            title: 'Tipo de actor',
          },
        ],
      },
      className: 'col-span-12',
    },
  ]

  const { mutateAsync: createActor, isPending: creatingActor } = useMutationDynamicBaseUrl({
    baseKey: 'urlProcess',
    url: `/processes/${idProcess}/actors`,
    onSuccess: () => {
      toast.success('Actor creado correctamente')
      onSuccess?.()
    },
    onError: (error) => {
      toast.error(error?.message ?? 'Error al crear el actor')
    },
  })

  const onSubmit = (data) => {
    createActor({
      body: {
        idUserActor: data?.actorData?.id,
        actorData: {
          additionalData: [
            { id: 'firstName', value: data?.actorData?.firstName },
            { id: 'lastName', value: data?.actorData?.lastName },
            { id: 'identification', value: data?.actorData?.documentId },
          ],
        },
        actorTypeKey: data?.actorTypeKey?.keyName,
      },
    })
  }

  return (
    <form
      className='general_form_container'
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <BackdropLoading loading={creatingActor} />
      <GenericForm
        control={form.control}
        inputs={inputs}
      />
      <div className='col-span-12 flex justify-end gap-4'>
        <Button
          variant='contained'
          color='error'
          onClick={onCancel}
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
  )
}

export default AddActor
