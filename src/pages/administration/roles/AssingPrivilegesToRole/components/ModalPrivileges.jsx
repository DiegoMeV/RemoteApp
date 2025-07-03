import { CustomCheckCircle, CustomModal, DataGridCustom } from '@/libV4'

const ModalPrivileges = ({ modalPrivilege, assignNewPriv, idRole }) => {
  const handleNewPriv = async (data) => {
    await assignNewPriv({ body: { privilegeId: data?.id } })
  }

  return (
    <CustomModal
      title='Buscar privilegio'
      open={modalPrivilege?.show}
      handleClose={modalPrivilege?.handleShow}
      size='xl'
    >
      <DataGridCustom
        requestProps={{
          baseKey: 'urlUsers',
          url: `/privileges`,
          additionalQry: `&roleId=${idRole}`,
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
              headerName: 'Código',
              field: 'sid',
            },
            {
              headerName: '',
              field: 'options',
              pinned: 'right',
              width: 50,
              renderCell: (data) => {
                return (
                  <CustomCheckCircle
                    handleClick={() => handleNewPriv(data)}
                    isMatch={data?.isAssigned}
                  />
                )
              },
            },
          ],
        }}
      />
    </CustomModal>
  )
}

export default ModalPrivileges
