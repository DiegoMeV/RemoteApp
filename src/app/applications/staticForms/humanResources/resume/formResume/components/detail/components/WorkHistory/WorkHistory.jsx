import { BasicTable, CustomModal, useBoolean } from '@/libV4'
import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import { columnsWorkHistory } from './constants'
import { WorkHistoryForm } from './components'

const WorkHistory = () => {
  const modalWorkHistory = useBoolean()
  return (
    <div className='backgroundwhite1 p-8'>
      <div className='w-full flex justify-end py-5'>
        <Button
          variant='contained'
          startIcon={<Add />}
          onClick={() => modalWorkHistory?.handleShow()}
        >
          Agregar
        </Button>
      </div>
      <BasicTable
        containerProps={{
          className: 'h-[calc(100vh-320px)]',
        }}
        columns={columnsWorkHistory}
        rows={[]}
        paginationLocal={{
          rowsPerPageOptions: { label: '100', value: 100 },
          defaultModel: {
            page: 0,
            pageSize: 100,
          },
        }}
      />
      {modalWorkHistory?.show && (
        <CustomModal
          open={modalWorkHistory?.show}
          title={'Historia laboral'}
          handleClose={modalWorkHistory?.handleShow}
          size='lg'
        >
          <WorkHistoryForm modalWorkHistory={modalWorkHistory} />
        </CustomModal>
      )}
    </div>
  )
}

export default WorkHistory
