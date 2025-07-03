import { BasicTable, CustomModal, useBoolean } from '@/libV4'
import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import { columnsLanguages } from './constants'
import { LanguagesForm } from './components'

const Languages = () => {
  const modalLanguages = useBoolean()
  return (
    <div className='backgroundwhite1 p-8'>
      <div className='w-full flex justify-end py-5'>
        <Button
          variant='contained'
          startIcon={<Add />}
          onClick={() => modalLanguages?.handleShow()}
        >
          Agregar
        </Button>
      </div>
      <BasicTable
        containerProps={{
          className: 'h-[calc(100vh-320px)]',
        }}
        columns={columnsLanguages}
        rows={[]}
        paginationLocal={{
          rowsPerPageOptions: { label: '100', value: 100 },
          defaultModel: {
            page: 0,
            pageSize: 100,
          },
        }}
      />
      {modalLanguages?.show && (
        <CustomModal
          open={modalLanguages?.show}
          title={'Idiomas'}
          handleClose={modalLanguages?.handleShow}
          size='lg'
        >
          <LanguagesForm modalLanguages={modalLanguages} />
        </CustomModal>
      )}
    </div>
  )
}

export default Languages
