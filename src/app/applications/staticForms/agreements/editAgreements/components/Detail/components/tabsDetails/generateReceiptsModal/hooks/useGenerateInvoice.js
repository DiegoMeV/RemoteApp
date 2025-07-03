import { useMutationDynamicBaseUrl } from '@/libV4'
// import { useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'

const useGenerateInvoice = ({
  // idPaymentAgreement,
  // expirationDate,
  // agreementCode,
  setIsProcessed,
  setInvoiceData,
}) => {
  // const configuration = useStoreState((state) => state.configurationJson.configuration)

  // Generacion de recibo de acuerdo de pago para el convenio
  const { mutateAsync: generateInvoice, isPending: pendingInvoice } = useMutationDynamicBaseUrl({
    url: '/facturacion/genera-factura-convenio',
    baseKey: 'urlPayments',
    isCompanyRequest: true,
    onSuccess: (data) => {
      //   toast.error(data?.data?.dataFactura?.P_Message ?? 'Error al generar factura')
      toast.success('Factura generada')
      setIsProcessed(true)
      setInvoiceData(data?.data?.dataFactura)
    },
    onError: (e) => toast.error(e?.response?.data?.error ?? 'Error al generar facturada'),
  })

  const handleGenerateInvoice = () => {
    // selectedRowsArray
    // const cuotaInicial = selectedRowsArray.length > 0 ? selectedRowsArray[0].cuota : null
    // const cuotaFinal =
    //   selectedRowsArray.length > 0 ? selectedRowsArray[selectedRowsArray.length - 1].cuota : null
    // const totalValue = selectedRowsArray.reduce((acc, row) => acc + Number(row?.valor), 0) ?? 0
    // const invoiceInfo = {
    //   nitCompania: envVars.nitCompany ?? '',
    //   modulo: configuration?.moduleName ?? '',
    //   codigo: agreementCode ?? '',
    //   valor: totalValue,
    //   convenio: idPaymentAgreement,
    //   cuotaInicial: cuotaInicial,
    //   cuotaFinal: cuotaFinal,
    //   fechaLimite: expirationDate,
    // }

    const invoiceInfo = {}
    generateInvoice({ body: invoiceInfo })
  }

  return { handleGenerateInvoice, pendingInvoice }
}

export default useGenerateInvoice
