import {
  BasicDataInbox,
  ChangeStatus,
  CurrentDocumentsInbox,
  HistoricalTaskList,
} from '@/pages/audit/components'

const useModalsOptions = ({
  historicalStates,
  idProcess,
  basicDataStates,
  currentDocsStates,
  changeStatus,
}) => {
  const modals = [
    {
      title: 'Histórico',
      open: historicalStates.show,
      handleClose: historicalStates.handleShow,
      children: <HistoricalTaskList idProcess={idProcess} />,
    },
    {
      title: 'Datos básicos',
      open: basicDataStates.show,
      handleClose: basicDataStates.handleShow,
      children: <BasicDataInbox idProcess={idProcess} />,
    },
    {
      title: 'Documentos Vigentes',
      open: currentDocsStates.show,
      handleClose: currentDocsStates.handleShow,
      children: <CurrentDocumentsInbox idProcess={idProcess} />,
    },
    {
      title: 'Cambiar estado del proceso',
      open: changeStatus.show,
      handleClose: changeStatus.handleShow,
      children: (
        <ChangeStatus
          idProcess={idProcess}
          closeModal={changeStatus.handleShow}
        />
      ),
      height: 'auto',
    },
  ]

  const openedModal = modals.find((modal) => modal.open)

  return { openedModal }
}

export default useModalsOptions
