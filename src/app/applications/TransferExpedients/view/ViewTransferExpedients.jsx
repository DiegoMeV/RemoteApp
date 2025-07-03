import { CardContentPage, TitlePage } from '@/app/audit/components'
import { DataGridCustom } from '@/libV4'
import { Box } from '@mui/material'
import { AutocompletesUsers } from '../components'
import { BackdropLoading } from '@/lib'

const ViewTransferExpedients = ({
  columns,
  buttonProps,
  selectedRowKeys,
  setSelectedRowKeys,
  isPendingTransfer,
  ...propsUser
}) => {
  return (
    <>
      {isPendingTransfer && <BackdropLoading open={isPendingTransfer} />}
      <TitlePage
        title={'Traslado de procesos'}
        backpath={'/applications'}
      />
      <CardContentPage>
        <Box width='100%'>
          {(!propsUser?.originUser || !propsUser?.assignedUser) && (
            <div className='flex m-4 items-center justify-center h-20  text-xl text-[rgba(130,130,130,1)] bg-[rgba(255,221,26,0.08)] shadow-sm border-r-4'>
              Seleccione el usuario de origen y el usuario de destino requeridos para la operación.
            </div>
          )}
          <AutocompletesUsers {...propsUser} />
          {propsUser?.originUser && propsUser?.assignedUser && (
            <DataGridCustom
              tableProps={{
                columns: columns ?? [],
                containerProps: { className: 'h-[calc(100vh-450px)] min-h-[300px]' },
                selectionModel: {
                  selectedRows: selectedRowKeys,
                  setSelectedRows: setSelectedRowKeys,
                  getCheckBoxProps: (record) => ({
                    disabled: record.Task?.Actions?.some(
                      (action) => action.actionType === 'SIGN_DOCUMENT'
                    ),
                  }),
                },
              }}
              requestProps={{
                isCompanyRequest: true,
                baseKey: 'urlProcess',
                url: `/tools/process-transfer/pending-activities/${propsUser?.originUser.id ?? ''}`,
                paginationSkip: true,
                querySearch: 'searchString',
              }}
              toolbarProps={{ buttonProps }}
            />
          )}
        </Box>
      </CardContentPage>
    </>
  )
}

export default ViewTransferExpedients
