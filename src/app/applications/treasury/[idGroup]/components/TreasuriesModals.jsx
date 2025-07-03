import { HistoricalTaskList } from '@/app/inbox/components/historical'
import { PaymentOrder } from '.'
import { BasicDataInbox, CustomModal } from '@/lib'
import { CurrentDocumentsInbox } from '@/app/inbox/components/currentDocuments'

const TreasuriesModals = ({
  idProcess,
  historicalStates,
  basicDataStates,
  paymentOrderStates,
  currentDocsStates,
  infoOrder,
  refetchTreasuriesList,
}) => {
  const modalOptions = [
    {
      title: 'Histórico',
      open: historicalStates?.show,
      handleClose: historicalStates?.handleShow,
      children: (
        <HistoricalTaskList
          idProcess={idProcess}
          closeModal={historicalStates?.handleShow}
        />
      ),
    },
    {
      title: 'Datos básicos',
      open: basicDataStates?.show,
      handleClose: basicDataStates?.handleShow,
      children: <BasicDataInbox idProcess={idProcess} />,
    },
    {
      title: 'Documentos Vigentes',
      open: currentDocsStates?.show,
      handleClose: currentDocsStates?.handleShow,
      children: <CurrentDocumentsInbox idProcess={idProcess} />,
    },
    {
      title: 'Devolver proceso orden de pago',
      open: paymentOrderStates?.show,
      handleClose: paymentOrderStates?.handleShow,
      children: (
        <PaymentOrder
          idProcess={idProcess}
          infoOrder={infoOrder}
          refetchTreasuriesList={refetchTreasuriesList}
          paymentOrderStates={paymentOrderStates}
        />
      ),
      size: 'md',
      maxHeight: '500px',
    },
  ]

  return (
    <>
      {modalOptions.map((modal, index) => (
        <CustomModal
          key={index}
          open={modal.open}
          handleClose={modal.handleClose}
          size={modal?.size ?? 'xl'}
          height={modal.height ?? 'calc(100vh - 150px)'}
          title={modal.title}
          maxHeight={modal.maxHeight}
        >
          {modal.children}
        </CustomModal>
      ))}
    </>
  )
}

export default TreasuriesModals
