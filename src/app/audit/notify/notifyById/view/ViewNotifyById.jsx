import { CardContentPage, TitlePage } from '@/app/audit/components'
import { CustomModal } from '@/lib'
import { DataGridCustom } from '@/libV4'

const ViewNotifyById = ({ idNotify, columns, modals }) => {
  return (
    <>
      <TitlePage
        title='Información de la Notificación'
        backpath={'/audit/notify'}
      />
      <CardContentPage>
        <DataGridCustom
          requestProps={{
            isCompanyRequest: true,
            baseKey: 'urlFiscalizacion',
            url: `/massive-activities/${idNotify}/expedients`,
          }}
          tableProps={{
            columns: columns ?? [],
            containerProps: { className: 'h-[calc(100vh-450px)] min-h-[300px]' },
          }}
        />
        {modals.map((modal, index) => {
          return (
            <CustomModal
              key={index}
              open={modal.open}
              handleClose={modal.handleClose}
              size='xxl'
              height={modal?.height ?? 'calc(100vh - 150px)'}
              title={modal.title}
            >
              {modal.children}
            </CustomModal>
          )
        })}
      </CardContentPage>
    </>
  )
}

export default ViewNotifyById
