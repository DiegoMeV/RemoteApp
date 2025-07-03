import { BasicTable, CustomModal, useBoolean, useQueryDynamicApi } from '@/libV4'
import { paymentsColumns } from '../../../constants'
import { useState } from 'react'
import { DebtConceptsModal } from '.'

const Payments = ({ idAgreement }) => {
  const openModal = useBoolean()

  const [currentRow, setCurrentRow] = useState(null)

  const { data: paymentsAgreement, isLoading: isLoadingRequest } = useQueryDynamicApi({
    baseKey: 'urlRentasApi',
    url: `/rentas/pagos?idConvenio=${idAgreement}`,
    isCompanyRequest: true,
    enabled: !!idAgreement,
  })

  const columns = paymentsColumns({ openModal, setCurrentRow })

  return (
    <div className='backgroundwhite1 h-full w-full flex flex-col gap-4 p-4'>
      <BasicTable
        containerProps={{
          className: 'h-[450px]',
        }}
        rows={paymentsAgreement?.data || []}
        columns={columns}
        loading={isLoadingRequest}
      />
      {openModal?.show && (
        <CustomModal
          open={openModal?.show}
          handleClose={openModal?.handleShow}
          title={'Conceptos del pago'}
        >
          <DebtConceptsModal currentRow={currentRow} />
        </CustomModal>
      )}
    </div>
  )
}

export default Payments
