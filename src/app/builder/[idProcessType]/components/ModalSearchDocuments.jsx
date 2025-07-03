// DELETE IN NEXT PR
import { TableChooseDocument } from '.'
import { CustomModal, SearchTable } from '@/lib'
import { Box } from '@mui/material'
import { useDocumentActionModal } from '../hooks'
import { sxAccordionStyles } from '../styles'

const ModalSearchDocuments = ({ columns, open, handleClose, title, actionType }) => {
  const {
    loading,
    searchText,
    requestSearch,
    filteredRows,
    handlePaginationModelChange,
    rowCountState,
    paginationModel,
  } = useDocumentActionModal(actionType, open)

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      size='lg'
      title={title}
    >
      <Box sx={sxAccordionStyles.accordionContentModalDocuments}>
        <SearchTable
          onChange={requestSearch}
          searchText={searchText}
          clearSearch={() => requestSearch('')}
          width={'100%'}
        />
        <TableChooseDocument
          loading={loading}
          columns={columns}
          rows={filteredRows}
          handlePaginationModelChange={handlePaginationModelChange}
          rowCountState={rowCountState}
          paginationModel={paginationModel}
        />
      </Box>
    </CustomModal>
  )
}

export default ModalSearchDocuments
