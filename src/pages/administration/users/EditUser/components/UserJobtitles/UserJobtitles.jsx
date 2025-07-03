import { IconButton } from '@mui/material'
import { Edit, Menu } from '@mui/icons-material'
import { useState } from 'react'
import { generalColumns, inputsUserJobtitles } from './funcs'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import {
  AccessControl,
  BackdropLoading,
  DataGridCustom,
  DrawerEdition,
  FormEditBasic,
  useBoolean,
  useMutationDynamicBaseUrl,
} from '@/libV4'
import { useStoreActions } from 'easy-peasy'

const UserJobtitles = ({ idUser }) => {
  const queryClient = useQueryClient()
  // const { setVLProps } = useRootStore()
  const setVLProps = useStoreActions((actions) => actions.newValueList.setVLProps)

  const drawerEdition = useBoolean({
    confirmModalProps: {
      title: '¿Está seguro de cancelar la edición?',
      icon: 'warning',
    },
  })
  const [jobTitleData, setJobTitleData] = useState({})

  const editJobTitle = (data) => {
    setJobTitleData(data)
    drawerEdition.handleShow()
  }

  const { mutateAsync: modifyUserJobtitle, isPending: modifyingUserJobtitle } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlUsers',
      url: `/users/${idUser}/jobTitles`,
      onSuccess: () => {
        toast.success('Cargo modificado con éxito')
        queryClient.invalidateQueries([`/users/${idUser}/jobTitles`])
        drawerEdition.handleShow()
      },
      onError: (e) => {
        toast.error(e?.message ?? 'Error al modificar el cargo')
      },
    })

  const submitForm = (data) => {
    if (jobTitleData?.id) {
      modifyUserJobtitle({
        qry: `/${jobTitleData?.id}`,
        methodBody: 'put',
        body: { finishedAt: data.finishedAt },
      })
      return
    } else {
      modifyUserJobtitle({
        body: {
          jobTitleId: data.jobTitleId?.id,
          hierarchyId: data.hierarchyId?.id,
          startedAt: data.startedAt,
          finishedAt: data.finishedAt,
        },
      })
    }
  }

  const handleShowRolesByJobtitle = (params) => {
    setVLProps({
      open: true,
      title: params?.name,
      columns: [
        {
          title: 'Role',
          dataIndex: 'name',
        },
      ],
      requestParams: {
        baseKey: 'urlUsers',
        url: `/jobTitles/${params?.jobTitle?.id}/roles`,
      },
    })
  }

  return (
    <div>
      <BackdropLoading loading={modifyingUserJobtitle} />
      <DataGridCustom
        requestProps={{
          baseKey: 'urlUsers',
          url: `/users/${idUser}/jobTitles`,
          additionalQry: '&isActive=true',
        }}
        tableProps={{
          columns: [
            ...generalColumns,
            {
              headerName: '',
              field: 'actions',
              pinned: 'right',
              width: 90,
              renderCell: (data) => {
                return (
                  <div className='flex justify-end'>
                    <AccessControl privilege='usuarios.usuarios.editar_cargos'>
                      <IconButton
                        title='Editar'
                        onClick={() => editJobTitle(data)}
                        data-testid='edit-jobtitle-button'
                      >
                        <Edit />
                      </IconButton>
                    </AccessControl>
                    <IconButton
                      title='Ver roles'
                      onClick={() => handleShowRolesByJobtitle(data)}
                    >
                      <Menu />
                    </IconButton>
                  </div>
                )
              },
            },
          ],
          containerProps: {
            className: 'h-[calc(100vh-450px)]',
          },
        }}
        toolbarProps={{
          buttonProps: {
            privilege: 'usuarios.usuarios.agregar_cargos',
            onClick: () => editJobTitle(null),
          },
        }}
      />
      {drawerEdition.show && (
        <DrawerEdition
          open={drawerEdition.show}
          onClose={() => drawerEdition.handleShowConfirm()}
          title={
            jobTitleData?.id
              ? `Editar cargo ${
                  jobTitleData?.jobTitle?.name ? `- ${jobTitleData.jobTitle.name}` : ''
                }`
              : `Agregar cargo `
          }
        >
          <FormEditBasic
            inputs={inputsUserJobtitles(!jobTitleData)}
            defaultValues={{
              jobTitleId: jobTitleData?.jobTitle,
              hierarchyId: jobTitleData?.dependency,
              startedAt: jobTitleData?.startedAt ?? new Date(),
              finishedAt: jobTitleData?.finishedAt,
            }}
            cancelForm={() => drawerEdition.handleShowConfirm()}
            submitForm={submitForm}
          />
        </DrawerEdition>
      )}
    </div>
  )
}

export default UserJobtitles
