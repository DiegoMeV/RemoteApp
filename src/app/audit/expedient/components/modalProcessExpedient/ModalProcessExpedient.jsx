import { CustomModal, DataGridCustom, useBoolean } from '@/libV4'
import { useState } from 'react'

import { columnsResults } from '@/pages/audit/funcs'
import { useNavigate } from 'react-router-dom'
import { useModalsOptions } from './hooks'

const ModalProcessExpedient = ({ idInspectionPlan, openModal, handleClose, title }) => {
  const [idProcess, setIdProcess] = useState()
  const historicalStates = useBoolean()
  const basicDataStates = useBoolean()
  const currentDocsStates = useBoolean()
  const changeStatus = useBoolean()
  const navigate = useNavigate()

  const columns = columnsResults({
    setIdProcess,
    openModals: {
      handleShowHistorical: historicalStates.handleShow,
      handleShowCurrentDocs: currentDocsStates.handleShow,
      handleShowBasicData: basicDataStates.handleShow,
      handleShowChangeStatus: changeStatus.handleShow,
    },
    navigate,
  })

  const { openedModal } = useModalsOptions({
    historicalStates,
    idProcess,
    basicDataStates,
    currentDocsStates,
    changeStatus,
  })

  return (
    <>
      <CustomModal
        open={openModal ?? false}
        handleClose={handleClose}
        size='xxl'
        height='calc(100vh - 150px)'
        title={title}
      >
        <DataGridCustom
          tableProps={{
            columns,
          }}
          requestProps={{
            isCompanyRequest: true,
            baseKey: 'urlFiscalizacion',
            url: `/processes`,
            additionalQry: `&idInspectionPlan=${idInspectionPlan}`,
          }}
        />
      </CustomModal>
      {openedModal?.open && (
        <CustomModal
          open={openedModal.open}
          handleClose={openedModal.handleClose}
          size='xxl'
          height='calc(100vh - 150px)'
          title={openedModal.title}
        >
          {openedModal.children}
        </CustomModal>
      )}
    </>
  )
}

export default ModalProcessExpedient
