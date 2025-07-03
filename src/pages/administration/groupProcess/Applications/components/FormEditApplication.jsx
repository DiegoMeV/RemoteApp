import {
  BackdropLoading,
  CustomModal,
  GenericForm,
  isEmpty,
  useMutationDynamicBaseUrl,
} from '@/libV4'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { inputsApplication } from '../funcs'

const FormEditApplication = ({ modalEditApp, selectedApp, onSuccessApp }) => {
  const form = useForm()

  const queryClient = useQueryClient()

  useEffect(() => {
    if (!isEmpty(selectedApp)) {
      form.reset({
        name: selectedApp?.name,
        shortName: selectedApp?.shortName,
        identifier: selectedApp?.identifier,
        isEnabled: selectedApp?.isEnabled ?? true,
        description: selectedApp?.description,
      })
    }
  }, [form, selectedApp])

  const { mutate: modifyApp, isPending: modifyingApp } = useMutationDynamicBaseUrl({
    url: '/applications',
    baseKey: 'urlProcess',
    onSuccess: () => {
      toast.success('Aplicación guardada con éxito')
      queryClient.invalidateQueries(['/process-type-groups/full-info'])
      onSuccessApp()
    },
    onError: (error) => {
      toast.error(error?.message ?? 'Error al guardar la aplicación')
    },
  })

  const onSubmit = (data) => {
    if (isEmpty(selectedApp)) {
      modifyApp({
        body: data,
      })
      return
    }
    modifyApp({
      body: data,
      methodBody: 'put',
      qry: `/${selectedApp?.id}`,
    })
  }
  return (
    <>
      {modalEditApp?.show && (
        <CustomModal
          title={
            isEmpty(selectedApp)
              ? 'Agregar aplicación'
              : `Editar aplicación ${selectedApp?.name ? `- ${selectedApp?.name}` : ''}`
          }
          open={modalEditApp?.show}
          handleClose={() => modalEditApp?.handleShowConfirm()}
          size='xl'
          modalType='form'
          onSubmit={form.handleSubmit(onSubmit)}
          actions={[
            {
              label: 'Cancelar',
              color: 'error',
              onClick: () => modalEditApp?.handleShowConfirm(),
            },
            {
              label: 'Guardar',
              type: 'submit',
            },
          ]}
        >
          <BackdropLoading loading={modifyingApp} />
          <div className='general_form_container'>
            <GenericForm
              control={form.control}
              inputs={inputsApplication}
            />
          </div>
        </CustomModal>
      )}
    </>
  )
}

export default FormEditApplication
