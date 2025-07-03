import { BasicTable, useQueryDynamicApi } from '@/libV4'
import { receiptsIssuedColumns } from '../../../constants'
import { toArray } from '@/lib'

const ReceiptsIssued = ({ idAgreement = '' } = {}) => {
  // TODO
  // {{api-url}}/:idCompania/facturacion/facturas?idConvenio=17b59bd5-a229-4c23-85e0-23bee4ab8d80
  // refetch,
  const { data: agreementInvoices, isLoading: loading } = useQueryDynamicApi({
    baseKey: 'urlRentasApi',
    url: `/facturacion/facturas?idConvenio=${idAgreement}`,
    isCompanyRequest: true,
    enabled: !!idAgreement,
  })

  const handleViewDocument = () => {}

  const columns = receiptsIssuedColumns({ handleViewDocument })
  const rows = toArray(agreementInvoices?.data)

  return (
    <section className='backgroundwhite1 h-full w-full flex flex-col gap-4 p-4'>
      <BasicTable
        containerProps={{ className: 'h-[450px]' }}
        rows={rows}
        columns={columns}
        loading={loading}
      />
    </section>
  )
}

export default ReceiptsIssued
