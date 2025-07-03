import { BasicTable, CustomModal, useBoolean } from '@/libV4'
import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import { columnsFamily } from './constants'
import { FamilyForm } from './components'

const Family = () => {
  const modalFamily = useBoolean()
  return (
    <div className='backgroundwhite1 p-8'>
      <div className='w-full flex justify-end py-5'>
        <Button
          variant='contained'
          startIcon={<Add />}
          onClick={() => modalFamily?.handleShow()}
        >
          Agregar
        </Button>
      </div>
      <BasicTable
        containerProps={{
          className: 'h-[calc(100vh-320px)]',
        }}
        columns={columnsFamily}
        rows={[]}
        paginationLocal={{
          rowsPerPageOptions: { label: '100', value: 100 },
          defaultModel: {
            page: 0,
            pageSize: 100,
          },
        }}
      />
      {modalFamily?.show && (
        <CustomModal
          open={modalFamily?.show}
          title={'Familia'}
          handleClose={modalFamily?.handleShow}
          size='lg'
        >
          <FamilyForm modalFamily={modalFamily} />
        </CustomModal>
      )}
    </div>
  )
}

export default Family
