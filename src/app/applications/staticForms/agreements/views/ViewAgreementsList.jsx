import { BasicTable, BasicTitle } from '@/libV4'
// Mover archivo al libV4
import { HeaderTable } from '../../humanResources/components'

const ViewAgreementsList = ({
  rows,
  columns,
  isPendingQuery,
  searchAgreement,
  handleAdd,
  handleGetData,
}) => {
  return (
    <>
      <BasicTitle title='Acuerdos de pagos vehicular' />
      <section className='grid grid-cols-12 gap-4 p-4 backgroundGray1'>
        <HeaderTable
          searchOptions={searchAgreement}
          handleAdd={handleAdd}
          handleSearch={handleGetData}
        />
        <BasicTable
          containerProps={{
            className: 'h-[calc(100vh-320px)]',
          }}
          columns={columns}
          rows={rows ?? []}
          loading={isPendingQuery}
          paginationLocal={{
            rowsPerPageOptions: { label: '100', value: 100 },
            defaultModel: {
              page: 0,
              pageSize: 100,
            },
          }}
        />
      </section>
    </>
  )
}

export default ViewAgreementsList
