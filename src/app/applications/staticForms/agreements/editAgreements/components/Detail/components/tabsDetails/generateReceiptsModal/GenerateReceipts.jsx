import { useState } from 'react'
import { useGridApiRef } from '@mui/x-data-grid-premium'
import { BackdropLoading, BasicTable, currentDay, useQueryDynamicApi } from '@/libV4'
import { ButtonsGenerateReceipts, MultiSelectTable } from './components'
import { columnsReceipts } from './constants'
import { useGenerateInvoice } from './hooks'

const GenerateReceipts = ({ idAgreement, idPaymentAgreement, infoPaymentAgreement }) => {
  const [isProcessed, setIsProcessed] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [invoiceData, setInvoiceData] = useState({})
  const apiRef = useGridApiRef()

  const {
    data: paymentAgreements,
    isLoading: isLoadingRequest,
    refetch,
  } = useQueryDynamicApi({
    baseKey: 'urlRentasApi',
    url: `/convenios/cuotas-convenio-v2/${idAgreement}`,
    isCompanyRequest: true,
    enabled: !!idAgreement,
  })

  // Vendria siendo el codigo del convenio, que viene por props
  const agreementCode = infoPaymentAgreement?.codigo ?? ''

  const firstDebt = paymentAgreements?.data?.dataCuotasConvenio?.find(
    (row) => row?.vencido === false
  )?.fechaLimiteFmt

  const today = currentDay()
  const expirationDate = firstDebt ?? today ?? null

  const { handleGenerateInvoice, pendingInvoice } = useGenerateInvoice({
    idPaymentAgreement,
    expirationDate,
    setIsProcessed,
    setInvoiceData,
    agreementCode,
  })

  const handleShowInvoice = () => {
    window.open(invoiceData?.urlFactura, '_blank')
  }

  return (
    <div className='backgroundwhite1 h-full w-full flex flex-col gap-4 p-4'>
      <BackdropLoading loading={isLoadingRequest || pendingInvoice} />
      <ButtonsGenerateReceipts
        apiRef={apiRef}
        refetch={refetch}
        isProcessed={isProcessed}
        setSelectedRows={setSelectedRows}
        handleShowInvoice={handleShowInvoice}
        handleGenerateInvoice={handleGenerateInvoice}
      />
      {!isProcessed ? (
        <MultiSelectTable
          apiRef={apiRef}
          columns={columnsReceipts}
          rows={paymentAgreements?.data?.dataCuotasConvenio}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          height='600px'
          padding='0'
        />
      ) : (
        <BasicTable
          rows={selectedRows}
          columns={columnsReceipts}
          // getRowId={(row) => row?.cuota}
          containerProps={{ className: 'h-[700px]' }}
        />
      )}
    </div>
  )
}

export default GenerateReceipts
