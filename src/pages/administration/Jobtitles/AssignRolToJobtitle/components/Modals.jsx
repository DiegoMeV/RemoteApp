import { CustomModal } from '@/lib'
import { DataGridCustom } from '@/libV4'
import { CheckCircle } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const Modals = ({ modalToAddRol, modalPrivileges, JobtitleInfo, addRol, rolInfo, idJobtitle }) => {
  const modals = [
    {
      title: 'Agregar rol',
      open: modalToAddRol?.show,
      handleClose: modalToAddRol?.handleShow,
      children: (
        <DataGridCustom
          requestProps={{
            baseKey: 'urlUsers',
            url: `/roles`,
            additionalQry: `&jobTitleId=${idJobtitle}`,
          }}
          tableProps={{
            columns: [
              {
                headerName: 'Nombre',
                field: 'name',
              },
              {
                headerName: 'Descripción',
                field: 'description',
              },
              {
                headerName: '',
                field: 'roleId',
                pinned: 'right',
                width: 50,
                renderCell: (data) => {
                  const disabled = data?.JobTitlesRoles?.length > 0
                  return (
                    <IconButton
                      color='success'
                      onClick={() => {
                        addRol(data)
                      }}
                      data-testid='add-rol-button'
                      disabled={disabled}
                    >
                      <CheckCircle />
                    </IconButton>
                  )
                },
              },
            ],
          }}
        />
      ),
    },
    {
      title: `Privilegios de rol ${JobtitleInfo?.name ? `- ${JobtitleInfo?.name}` : ''}`,
      open: modalPrivileges?.show,
      handleClose: modalPrivileges?.handleShow,
      children: (
        <DataGridCustom
          requestProps={{
            baseKey: 'urlUsers',
            url: `/roles/${rolInfo?.roleId}/privileges`,
          }}
          tableProps={{
            columns: [
              {
                headerName: 'Nombre',
                field: 'name',
              },
              {
                headerName: 'Descripción',
                field: 'description',
              },
            ],
            rowHeight: 52,
          }}
        />
      ),
    },
  ]

  const modalInfo = modals.find((modal) => !!modal.open)

  return (
    <>
      {modalInfo?.open && (
        <CustomModal
          {...modalInfo}
          size='xl'
        >
          {modalInfo?.children}
        </CustomModal>
      )}
    </>
  )
}

export default Modals
