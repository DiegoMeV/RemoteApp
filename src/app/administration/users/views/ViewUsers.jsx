import { BackdropLoading, BasicTitle } from '@/lib'
import { ModalChangePassUser, ToolbarTableUser } from '../components'
import { CustomModal, DataGridCustom } from '@/libV4'

const ViewUsers = ({
  isPending,
  columns,
  buttons,
  isPendingDownloadExcel,
  paramsFilter,
  changePassUserParams = false,
}) => {
  const {
    form,
    infoUserSelected,
    handleSubmitPassUser,
    openChangePassword: openModal,
    isPendingUserPass,
  } = changePassUserParams

  const handleClose = () => {
    form?.reset()
    openModal?.handleShow()
  }

  return (
    <>
      <BasicTitle title='Administración de usuarios' />
      <BackdropLoading loading={isPending || isPendingDownloadExcel} />
      <DataGridCustom
        requestProps={{
          isCompanyRequest: true,
          baseKey: 'urlUsers',
          url: `/users`,
          additionalQry: `&isActive=${paramsFilter?.isActive}`,
        }}
        tableProps={{
          columns,
        }}
        toolbarProps={{
          searchProps: {
            className: 'xs:col-span-12 sm:col-span-6 md:col-span-6',
          },
          children: (
            <ToolbarTableUser
              paramsFilter={paramsFilter}
              buttons={buttons}
            />
          ),
        }}
      />

      {openModal?.show && (
        <CustomModal
          title='Actualizar la contraseña'
          open={openModal?.show}
          handleClose={handleClose}
          onSubmit={form?.handleSubmit(handleSubmitPassUser)}
          modalType='form'
          size='xs'
        >
          <ModalChangePassUser
            form={form}
            openModal={openModal}
            infoUserSelected={infoUserSelected}
            isPendingUserPass={isPendingUserPass}
          />
        </CustomModal>
      )}
    </>
  )
}

export default ViewUsers
