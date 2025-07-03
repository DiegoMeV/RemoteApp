import { BasicTable, CustomModal } from '@/libV4'
import { columnsAcademicFormation } from './constants'
import { Button, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useBoolean } from '@/lib'
import { AcademicFormationForm } from './components'

const AcademicFormation = () => {
  const modalAcademicFormation = useBoolean()
  return (
    <div className='backgroundwhite1'>
      <div className='w-full pt-8 pl-8'>
        <Typography
          variant='body1'
          color='secondary'
        >
          Subir los documentos en formato PDF, organizados del más antiguo al más reciente.
        </Typography>
      </div>
      <div className='p-8'>
        <div className='w-full flex justify-end py-5'>
          <Button
            variant='contained'
            startIcon={<Add />}
            onClick={() => modalAcademicFormation?.handleShow()}
          >
            Agregar
          </Button>
        </div>
        <BasicTable
          containerProps={{
            className: 'h-[calc(100vh-320px)]',
          }}
          columns={columnsAcademicFormation}
          rows={[]}
          paginationLocal={{
            rowsPerPageOptions: { label: '100', value: 100 },
            defaultModel: {
              page: 0,
              pageSize: 100,
            },
          }}
        />
      </div>
      {modalAcademicFormation?.show && (
        <CustomModal
          open={modalAcademicFormation?.show}
          title={'Formación académica'}
          handleClose={modalAcademicFormation?.handleShow}
          size='lg'
        >
          <AcademicFormationForm modalAcademicFormation={modalAcademicFormation} />
        </CustomModal>
      )}
    </div>
  )
}

export default AcademicFormation
