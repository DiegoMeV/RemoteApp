import { BasicTable, CustomModal, useBoolean } from '@/libV4'
import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import { columnsPublications } from './constants'
import { PublicationsForm } from './components'

const Publications = () => {
  const modalPublications = useBoolean()
  return (
    <div className='backgroundwhite1 p-8'>
      <div className='w-full flex justify-end py-5'>
        <Button
          variant='contained'
          startIcon={<Add />}
          onClick={() => modalPublications?.handleShow()}
        >
          Agregar
        </Button>
      </div>
      <BasicTable
        containerProps={{
          className: 'h-[calc(100vh-320px)]',
        }}
        columns={columnsPublications}
        rows={[]}
        paginationLocal={{
          rowsPerPageOptions: { label: '100', value: 100 },
          defaultModel: {
            page: 0,
            pageSize: 100,
          },
        }}
      />
      {modalPublications?.show && (
        <CustomModal
          open={modalPublications?.show}
          title={'Publicaciones'}
          handleClose={modalPublications?.handleShow}
          size='lg'
        >
          <PublicationsForm modalPublications={modalPublications} />
        </CustomModal>
      )}
    </div>
  )
}

export default Publications
