import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, LinearProgress } from '@mui/material'
import toast from 'react-hot-toast'
import { BackdropLoading, ErrorPage, GenericForm, useGetRole, useSubmitRole } from '@/libV4'
import { inputsCreationTol } from '../funcs/inputsCreationTol'

const RoleEdition = ({ idRole, onSuccessFunction, onClose }) => {
  const formRol = useForm()

  const {
    data: role,
    isLoading: loadingRole,
    isError: errorRole,
  } = useGetRole({
    qry: `/${idRole}`,
    enabled: !!idRole,
  })

  const { mutateAsync: changeRol, isPending: changingRol } = useSubmitRole({
    onSuccess: () => {
      toast.success('Rol guardado con éxito')
      onSuccessFunction?.()
    },
    onError: (e) => {
      toast.error(e.response?.data?.message ?? 'Error al guardar el rol')
    },
  })

  useEffect(() => {
    if (role) {
      const roleData = role?.data
      formRol.setValue('name', roleData.name)
      formRol.setValue('typeRole', roleData.typeRole)
      formRol.setValue('description', roleData.description)
      formRol.setValue('byDependency', roleData.byDependency)
    }
  }, [formRol, idRole, role])

  const onSubmit = (data) => {
    if (!idRole) {
      changeRol({
        body: data,
      })
      return
    }
    changeRol({
      body: { ...data, id: idRole },
      bodyMethod: 'PUT',
    })
  }

  return (
    <form
      className='general_form_container'
      onSubmit={formRol.handleSubmit(onSubmit)}
    >
      {loadingRole ? (
        <LinearProgress className='col-span-12' />
      ) : errorRole ? (
        <ErrorPage />
      ) : (
        <>
          <BackdropLoading loading={changingRol} />
          <GenericForm
            inputs={inputsCreationTol}
            control={formRol.control}
          />
          <div className='col-span-12 flex justify-end gap-2'>
            <Button
              variant='contained'
              color='error'
              onClick={onClose}
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
        </>
      )}
    </form>
  )
}

export default RoleEdition
