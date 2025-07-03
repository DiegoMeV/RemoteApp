import {
  BackdropLoading,
  BasicTitle,
  GenericForm,
  toArray,
  useMutationDynamicBaseUrl,
} from '@/libV4'
import { useForm } from 'react-hook-form'
import { inputBasicGroups } from '../constants'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useStoreActions } from 'easy-peasy'
import { ContentArrColumns } from '../components'
import toast from 'react-hot-toast'

const ViewEditProcessTypeGroups = ({ dataGroup, idApplication, idGroup, refetchGroup }) => {
  const navigate = useNavigate()

  const isNew = idGroup === 'new'

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const handleCancel = () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Cancelar',
      content: '¿Esta seguro que desea cancelar?',
      onConfirm: () => {
        navigate(`/administration/groupProcess`)
      },
    })
  }

  const orderColumns =
    dataGroup?.groupSpecs?.inboxProps?.columns?.sort((a, b) => a?.position - b?.position) ?? []

  const defaultValues = {
    name: dataGroup?.name,
    isEnabled: dataGroup?.isEnabled,
    filingForm: dataGroup?.filingForm,
    groupSpecs: {
      inboxProps: {
        columns: toArray(orderColumns) ?? [],
      },
      historyConfig: {
        showAssignedMode: dataGroup?.groupSpecs?.historyConfig?.showAssignedMode ?? 'USER',
      },
    },
  }

  const { control, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues,
  })

  const isEnabled = watch('isEnabled')
  const inputs = inputBasicGroups({ isEnabled })

  const { mutateAsync: modifyGroup, isPending: modifyingGroup } = useMutationDynamicBaseUrl({
    baseKey: 'urlProcess',
    url: '/process-type-groups',
    onSuccess: (response) => {
      toast.success('Grupo modificado correctamente')
      if (isNew) {
        navigate(`/administration/editProcessTypeGroups/${idApplication}/${response?.data?.id}`)
        return
      }
      refetchGroup()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const onSubmit = async (data) => {
    const { groupSpecs, ...restData } = data

    const columns = groupSpecs?.inboxProps?.columns?.sort((a, b) => a?.position - b?.position) ?? []

    const newData = {
      ...restData,
      groupSpecs: {
        ...groupSpecs,
        inboxProps: {
          columns,
        },
      },
    }

    if (idGroup === 'new') {
      modifyGroup({ body: { idApplication, ...newData } })
      return
    }
    modifyGroup({ body: { idApplication, ...newData }, qry: `/${idGroup}`, methodBody: 'put' })
  }

  return (
    <>
      <BasicTitle
        title={
          idGroup === 'new'
            ? 'Creación de grupo de tipos de procesos'
            : 'Edición de grupo de tipos de procesos'
        }
        backpath={`/administration/groupProcess`}
      />
      <BackdropLoading loading={modifyingGroup} />
      <form
        className='general_form_container backgroundGray1 p-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <GenericForm
          control={control}
          inputs={inputs}
        />
        <ContentArrColumns
          control={control}
          setValue={setValue}
          getValues={getValues}
        />
        <div className='col-span-12 flex justify-end gap-4'>
          <Button
            variant='contained'
            color='error'
            onClick={handleCancel}
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

export default ViewEditProcessTypeGroups
