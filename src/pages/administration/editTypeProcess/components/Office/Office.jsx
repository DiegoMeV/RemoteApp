import { useState } from 'react'
import ViewOffice from './ViewOffice'
import {
  BackdropLoading,
  DrawerEdition,
  FormEditBasic,
  useBoolean,
  useMutationDynamicBaseUrl,
} from '@/libV4'
import toast from 'react-hot-toast'
import { useStoreActions } from 'easy-peasy'
import { useQueryClient } from '@tanstack/react-query'

const Office = ({ idProcessType }) => {
  const addOffice = useBoolean({
    confirmModalProps: {
      icon: 'warning',
      title: 'Cancelar',
      content: '¿Está seguro que desea cancelar?',
    },
  })

  const queryClient = useQueryClient()

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const [selectedRow, setSelectedRow] = useState(null)

  const handleEdit = (data) => {
    setSelectedRow(data)
    addOffice.handleShow()
  }

  const { mutateAsync: modifyOffice, isPending: modifyingOffice } = useMutationDynamicBaseUrl({
    url: `/process-types/${idProcessType}/for-office`,
    baseKey: 'urlProcess',
    onSuccess: () => {
      toast.success('Dependencia modificada correctamente')
      queryClient.invalidateQueries({
        queryKey: [`/process-types/${idProcessType}/for-office?inclOffice=true`],
        exact: true,
      })
      addOffice.handleShow()
    },
    onError: (e) => {
      toast.error(e?.message ?? 'Error al modificar la dependencia')
    },
  })

  const { mutateAsync: deleteOffice, isPending: deletingOffice } = useMutationDynamicBaseUrl({
    url: `/process-types/${idProcessType}/for-office`,
    baseKey: 'urlProcess',
    method: 'delete',
    onSuccess: () => {
      toast.success('Dependencia eliminada correctamente')
      queryClient.invalidateQueries({
        queryKey: [`/process-types/${idProcessType}/for-office?inclOffice=true`],
        exact: true,
      })
    },
    onError: (e) => {
      toast.error(e?.message ?? 'Error al eliminar la dependencia')
    },
  })

  const handleDeleteOffice = async (idOffice) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Eliminar actor',
      content: '¿Esta seguro que desea eliminar este actor?',
      onConfirm: () => {
        deleteOffice({
          qry: `/${idOffice}`,
        })
      },
    })
  }

  const onSubmit = (data) => {
    const adaptData = {
      idOffice: data?.officeData?.id,
      isEnabled: data?.isEnabled ?? true,
    }
    if (selectedRow?.isNew) {
      modifyOffice({ body: adaptData })
      return
    }
    modifyOffice({
      qry: `/${selectedRow?.id}`,
      body: adaptData,
      methodBody: 'put',
    })
  }

  return (
    <div className='col-span-12'>
      <BackdropLoading loading={modifyingOffice || deletingOffice} />
      <ViewOffice
        idProcessType={idProcessType}
        handleEdit={handleEdit}
        handleDeleteOffice={handleDeleteOffice}
      />
      <DrawerEdition
        title={selectedRow?.isNew ? 'Agregar Dependencia' : 'Editar Dependencia'}
        open={addOffice?.show}
        onClose={() => addOffice.handleShowConfirm()}
      >
        <FormEditBasic
          submitForm={onSubmit}
          cancelForm={() => addOffice.handleShowConfirm()}
          defaultValues={{
            officeData: selectedRow?.officeData,
            isEnabled: selectedRow?.isEnabled,
          }}
          inputs={[
            {
              label: 'Dependencia',
              name: 'officeData',
              type: 'autocompleteRequest',
              disabled: !selectedRow?.isNew,
              requestprops: {
                baseKey: 'urlUsers',
                url: '/hierarchy',
              },
              queryRequest: { querySearch: 'querySearch' },
              vlprops: {
                columns: [
                  {
                    title: 'Nombre',
                    dataIndex: 'name',
                  },
                ],
                shouldClose: true,
              },
              required: true,
              className: 'col-span-12',
            },
            {
              label: 'Estado',
              name: 'isEnabled',
              type: 'switch',
              defaultValue: true,
              className: 'col-span-12',
            },
          ]}
        />
      </DrawerEdition>
    </div>
  )
}

export default Office
