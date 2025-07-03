import { AgreementDues, Files, GenerateReceipts, Payments, ReceiptsIssued } from '../components'

const setTabDetails = ({ idAgreement }) => {
  return [
    {
      id: 'dues',
      label: 'Cuotas',
      component: <AgreementDues idAgreement={idAgreement} />,
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
    {
      id: 'receiptsIssued',
      label: 'Recibos expedidos',
      component: <ReceiptsIssued idAgreement={idAgreement} />,
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
    {
      id: 'payments',
      label: 'Pagos',
      component: <Payments idAgreement={idAgreement} />,
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
    {
      id: 'generateReceipts',
      label: 'Generacion de recibos',
      component: <GenerateReceipts idAgreement={idAgreement} />,
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
    {
      id: 'files',
      label: 'Expedientes',
      component: <Files />,
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
  ]
}

export default setTabDetails
