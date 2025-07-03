import { useGetProcess } from '@/lib'
import { Box } from '@mui/material'
import AccordionParentInfo from './AccordionParentInfo'
import AccordionChildProcess from './AccordionChildProcess'
import { CustomModal, useBoolean } from '@/libV4'
import { HistoricalTaskList } from '..'
import { useState } from 'react'

const RelatedProcesses = ({ idProcess }) => {
  const { data: relatedProcess, isLoading: loadingRelatedProcesses } = useGetProcess({
    qry: `/${idProcess}?inclChildProcs=true&inclParentProc=true`,
  })
  const ParentProcess = relatedProcess?.data?.[0]?.ParentProcess
  const [idRelatedProcess, setIdRelatedProcess] = useState()
  const [identifier, setIdentifier] = useState()
  const relatedProcessHistory = useBoolean()
  const handleShowHistory = (id) => {
    relatedProcessHistory.handleShow()
    setIdRelatedProcess(id)
  }

  return (
    <Box
      sx={{
        maxHeight: 'calc(100vh - 260px)',
        overflow: 'auto',
      }}
    >
      <AccordionParentInfo
        ParentProcess={ParentProcess}
        handleShowHistory={handleShowHistory}
      />
      <AccordionChildProcess
        relatedProcess={relatedProcess}
        loadingRelatedProcesses={loadingRelatedProcesses}
        handleShowHistory={handleShowHistory}
        setIdentifier={setIdentifier}
      />
      {relatedProcessHistory.show && (
        <CustomModal
          open={relatedProcessHistory.show}
          handleClose={relatedProcessHistory.handleShow}
          title={`Histórico - ${ParentProcess?.identifier ?? identifier ?? ''}`}
          size='xl'
        >
          <HistoricalTaskList
            idProcess={idRelatedProcess}
            closeModal={relatedProcessHistory?.handleShow}
          />
        </CustomModal>
      )}
    </Box>
  )
}

export default RelatedProcesses
